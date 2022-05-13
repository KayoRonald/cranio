import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect, useCallback } from 'react'
import ReactAudioPlayer from 'react-audio-player'
import _Swal from 'sweetalert2'
import swalReact from 'sweetalert2-react-content'
const Swal = swalReact(_Swal)
import axios from '@/api/index'
import { Header, Question, Alternatives } from '@/components/index'
import { Props } from '@/interface/index'
import Head from 'next/head'
import { Preparation } from '@/components/index'
import styles from '@/styles/Challenge.module.css'

function getMusic(time) {
  const random = Math.floor(Math.random() * 3)
  const musicTime = getTime(time)

  function getTime(time) {
    if (time <= 5) return 5
    else if (time > 5 && time <= 10) return 10
    else if (time > 10 && time <= 20) return 20
    else if (time > 20 && time <= 30) return 30
    else if (time > 30 && time <= 60) return 60
    else if (time > 60 && time <= 90) return 90
    else if (time > 90) return 120
  }

  return `/music/answer-${musicTime}s-${random + 1}.mp3`
}

const Challenge: NextPage<Props> = ({ api }) => {
  const router = useRouter()
  const { slug, test } = router.query
  const [active, setActive] = useState(false)
  const [music, setMusic] = useState(getMusic(api.time))
  const [answered, setAnswered] = useState(false)
  const [selectedAlternatives, setSelectedAlternatives]: [number[], Function] = useState([])
  const [started, setStarted] = useState(false)

  // Responder pergunta
  const answer = useCallback(async (key: any) => {
    // Mensagens
    const STATUS: any = {
      CORRECT: ['Parabéns, você acertou!', 'Você respondeu corretamente! Continue assim.', 'success', '/music/correct.mp3'],
      INCORRECT: ['Que pena, resposta errada!', 'Não fique triste, você deu o seu melhor! Volte amanhã.', 'error', '/music/incorrect.mp3'],
      TIMEOUT: ['Tempo esgotado!', 'Tic tac, o tempo acabou! Infelizmente você demorou muito e o relógio não parou. Amanhã você terá uma nova chance!', null, '/music/time\'s-up.mp3', '/img/alarm.gif']
    }

    setActive(false)
    setAnswered(true)
    // Que rufem os tambores...
    setMusic('/music/end.mp3')
    if (key) Swal.fire({
      imageUrl: '/img/drum.gif',
      text: 'Que rufem os tambores...',
      showConfirmButton: false
    })
    try {
      if (key) {
        var { data } = await axios.post('/challenge/check', {
          studentRegistration: slug,
          challengeID: api._id,
          choiceID: api.alternatives[key - 1]?._id || null
        })
      } else {
        var data: any = { status: 'TIMEOUT' }
      }

      // Exibe mensagem de sucesso/erro
      setTimeout(() => {
        setMusic(STATUS[data.status][3])
        Swal.fire({
          title: STATUS[data.status][0],
          text: data.message || STATUS[data.status][1],
          icon: STATUS[data.status][2],
          imageUrl: STATUS[data.status][4],
          imageHeight: 128,
          showConfirmButton: false
        })

      }, key ? 2000 : 0)
    } catch (err) {
      console.log(err)
      Swal.fire({
        title: 'Ocorreu um erro',
        icon: 'error',
        showConfirmButton: false
      })
    } finally {
      // Redireciona
      if (!test) setTimeout(() => {
        console.log('Redirecionando...')
        router.push('/').then(() => {
          Swal.close()
        })
      }, 5000)
      if (test) setAnswered(false)
      if (test) setSelectedAlternatives([])
    }
  }, [api, slug, router, test])

  // Quando a tecla for apertada
  const handleKeyDown = (e: any) => {
    if (answered || !started) return
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
    const key = parseInt(e.key)
    if (key > api.alternatives.length) return
    if (key) setSelectedAlternatives([...selectedAlternatives, key])
  }

  // Quando a tecla for desapertada
  const handleKeyUp = (e: any) => {
    if (answered || !started) return
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
    const key = parseInt(e.key)
    if (key > api.alternatives.length) return
    const alternatives = selectedAlternatives.filter(a => a !== key)
    if (!alternatives.length && key) return answer(key)
    if (key) setSelectedAlternatives(alternatives)
  }

  // Clique do mouse
  const handleClick = (alternativeIndex: any) => {
    if (!started) return
    answer(alternativeIndex + 1)
  }

  // Eventos do teclado
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  })

  return (
    <React.Fragment>
      <Head>
        <title>O Crânio | Desafio</title>
        <link rel="preload" as="image" href="/img/drum.gif" />
        <link rel="preload" as="image" href="/img/alarm.gif" />
      </Head>
      <Preparation {...api} callback={() => { setStarted(true); setActive(true) }} />
      <div className={styles.container}>
        <Header />
        <Question
          {...api}
          active={active}
          timeOutCallback={() => answer(null)}
        />
        <Alternatives
          {...api}
          active={active}
          selected={selectedAlternatives}
          handleClick={handleClick}
        />
      </div>

      <div className={`${styles.waveWrapper} ${styles.waveAnimation}`}>
        <div className={`${styles.waveWrapperInner} ${styles.bgTop}`}>
          <div className={`${styles.wave} ${styles.waveTop}`}></div>
        </div>
        <div className={`${styles.waveWrapperInner} ${styles.bgMiddle}`}>
          <div className={`${styles.wave} ${styles.waveMiddle}`}></div>
        </div>
        <div className={`${styles.waveWrapperInner} ${styles.bgBottom}`}>
          <div className={`${styles.wave} ${styles.waveBottom}`}></div>
        </div>
      </div>

      <ReactAudioPlayer
        src={started ? music : ''}
        autoPlay
      />
    </React.Fragment>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }: any) => {
  console.log(params.slug)
  const { data } = await axios.get<Props>(`/challenge/start/${params.slug}`)
  return {
    props: {
      api: data
    }
  }
}

export default Challenge