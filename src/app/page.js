import Categories from "@/components/Categories";
import PlainLayout from "@/components/master/PlainLayout";
import NewArtist from "@/components/NewArtist";
import Newest from "@/components/Newest";
import Slider from "@/components/Slider";
const getData = async () => {
  const sliderData = await ((await fetch(`${process.env.BASE_URL}/api/artworks/slider`, { cache: 'no-store' })).json());
  const newArtistsData = await ((await fetch(`${process.env.BASE_URL}/api/user/newest`, { cache: 'no-store' })).json());
  return { sliderData: sliderData["data"], newArtistsData: newArtistsData["data"] };
}

export default async function Home() {
  const { sliderData, newArtistsData } = await getData()
  return (
    <PlainLayout >
      <Slider sliderData={sliderData} />
      <Categories />
      <Newest />
      <NewArtist newArtits={newArtistsData} />
      <section className="bg-green-100 py-5">
        <div className="mx-1 sm:mx-4 md:mx-8 lg:mx-20 py-28 rounded-ss-full rounded-ee-full bg-red-600 border-2">
          <h1 className=" font-extrabold text-4xl md:text-7xl lg:text-8xl w-fit m-auto italic text-center"><span className="">EXPLORE YOUR DESIRE DIGITAL ARTWORK FROM</span> <span className="block w-fit m-auto text-white animate-bounce py-2">EVERYWHERE !</span></h1>
        </div>
      </section>
    </PlainLayout>
  );
}
