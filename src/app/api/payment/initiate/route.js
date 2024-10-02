import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server"
import { cookies, headers } from "next/headers";
import { VerifyToken } from "@/utility/JWTTokenHelper";

export const POST = async (req, res) => {
    try {
        const { artId, title, category, totalAmount } = await req.json()
        const prisma = new PrismaClient();
        const cookieStore = cookies()
        const token = cookieStore.get('token')
        const result = await VerifyToken(token?.value);
        const user = await prisma.users.findUnique({ where: { email: result.email } })
        const { id, name, email, mobile } = user
        const tran_id = (Math.floor(100000 + Math.random() * 900000)).toString();
        const init_url = "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";
        const formData = new FormData();
        formData.append("store_id", "sagar66f8263e9b2d9")
        formData.append("store_passwd", "sagar66f8263e9b2d9@ssl")
        formData.append("refer", "5B1F9DE4D82B6")
        formData.append("acct_no", "CUST_REF_01")

        formData.append("total_amount", `${totalAmount}`)
        formData.append("currency", "BDT")
        formData.append("tran_id", `${tran_id}`)
        formData.append("success_url", `${process.env.BASE_URL}/api/payment/success?tran_id=${tran_id}&artId=${artId}&userId=${id}&amount=${totalAmount}`)
        formData.append("fail_url", `${process.env.BASE_URL}/api/payment/failed?tran_id=${tran_id}&artId=${artId}&userId=${id}&amount=${totalAmount}`)
        formData.append("cancel_url", `${process.env.BASE_URL}/api/payment/cancel?tran_id=${tran_id}&artId=${artId}&userId=${id}&amount=${totalAmount}`)
        formData.append("ipn_url", `${process.env.BASE_URL}/api/payment/ipn?tran_id=${tran_id}&artId=${artId}&userId=${id}&amount=${totalAmount}`)
        formData.append("cus_name", `${name}`)
        formData.append("cus_email", `${email}`)
        formData.append("cus_add1", "Dhaka")
        formData.append("cus_add2", "Dhaka")
        formData.append("cus_city", "Dhaka")
        formData.append("cus_state", "Dhaka")
        formData.append("cus_postcode", "1000")
        formData.append("cus_country", "Bangladesh")
        formData.append("cus_phone", `${mobile}`)
        formData.append("cus_fax", "011111")
        formData.append("ship_name", `${name}`)
        formData.append("ship_add1", "Dhaka")
        formData.append("ship_add2", "Dhaka")
        formData.append("ship_city", "Dhaka")
        formData.append("ship_state", "Dhaka")
        formData.append("ship_postcode", "1000")
        formData.append("ship_country", "Bangladesh")
        formData.append("shipping_method", "YES")
        formData.append("product_name", `${title}`)
        formData.append("product_category", `${category}`)
        formData.append("product_profile", "Digital Art")
        formData.append("num_of_item", "1")

        const SSL_res = await fetch(init_url, {
            method: "POST",
            body: formData,
        })
        const SSL_data = await SSL_res.json()
        return NextResponse.json({ data: SSL_data })
    } catch (error) {
        return NextResponse.json({ status: "failed", error: error.toString() }, { status: 400 })
    }
}