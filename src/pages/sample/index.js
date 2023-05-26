import Seo from '../../components/seo'

export default function Sample() {
  return (
    <>
      <Seo
        pageTitle={'site title'}
        pageDescription={'site description'}
        pageImg={'https://demo.com'}
        pageImgWidth={1280}
        pageImgHeight={960}
      />

      <h3>サンプル</h3>
    </>
  )
}

export async function getStaticProps() {
  
}
