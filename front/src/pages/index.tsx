import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { NavHero } from '../components/'
import axios from '../api/'
import { Box, Heading, Flex, chakra } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import 'bootstrap/dist/css/bootstrap.min.css'
import Carousel from 'react-bootstrap/Carousel'

type IAds = {
  id: number;
  title?: string;
  description?: string;
  image: string;
  data: []
}

export const getServerSideProps: GetStaticProps = async () => {
  const { data } = await axios.get<IAds>('/ad/active')
  return {
    props: {
      data: data,
      test: new Date().toString()
    },
    // revalidate: 60, // At most once every 60 seconds
  }
}

const Home: NextPage<IAds> = (data) => {
  const router = useRouter()

  // Atualiza a lista de anúncios
  const refreshData = () => {
    router.replace(router.asPath)
  }

  React.useEffect(() => {
    const interval = setInterval(refreshData, 60000)
    return () => clearInterval(interval)
  })

  React.useEffect(() => {
    document.addEventListener('keyup', (event) => {
      const KEYS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '*', '#']
      if (!KEYS.includes(event.key)) return
      console.log('Abrindo login...')
      router.push('/login')
    })
  }, [])

  return (
    <Box>
      <Head>
        <title>Crânio</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavHero />
      <Carousel className="ads-carousel" pause={false} controls={false} interval={10000}>
        {data.data?.map((data: IAds, index: number) => {
          return (
            <Carousel.Item key={index}>
              <img className="background-img" src={data.image} alt={data.title} />
              <img src={data.image} alt={data.title} />
              {!data.title && !data.description ? (
                <React.Fragment />
              ) : (
                <Carousel.Caption>
                  <Box
                    w='full'
                    shadow="lg"
                    rounded="lg"
                    overflow="hidden"
                  >
                    <Heading
                      py={2}
                      textAlign="center"
                      fontWeight="bold"
                      textTransform="uppercase"
                      color="white"
                      letterSpacing={1}
                    >
                      {data.title}
                    </Heading>

                    <chakra.span
                      fontWeight="bold"
                      color="gray.200"
                      textAlign={'center'}
                    >
                      {data.description}
                    </chakra.span>
                  </Box>
                </Carousel.Caption>
              )}
            </Carousel.Item>
          )
        })}
      </Carousel>
    </Box>
  )
}
export default Home;