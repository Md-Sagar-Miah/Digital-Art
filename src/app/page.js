import Categories from "@/components/Categories";
import Explore from "@/components/Explore";
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
      <Explore />
    </PlainLayout>
  );
}
