import axios from "axios";

export default function Page() {
  return (
    <>
      <h3>フェッチ</h3>
    </>
  )
}

export async function getServerSideProps() {
  const ENDPOINT = 'http://localhost:3000/api/v1/users';
  const result = await axios.get(ENDPOINT).then(res => res.data)
  console.log(result)
  return { props: { } }
}
