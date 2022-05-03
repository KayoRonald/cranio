import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  InputProps,
  useColorModeValue,
  InputRightElement,
  InputGroup,
  InputLeftElement,
  useToast,
  useDisclosure,
  Center,
  Alert
} from '@chakra-ui/react';
import React from 'react';
import { BiErrorAlt } from 'react-icons/bi'
import { AiOutlineSend, AiOutlineUserAdd } from 'react-icons/ai'
import Head from 'next/head'
import axios from 'axios'
import { ModalAlert } from '../components/modal';
import { useRouter } from 'next/router';
import Countdown from 'react-countdown';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

export type Iuser = {
  id?: number;
  name: string;
  courseName: string;
}
export default function LoginChallenge(): JSX.Element {
  const [loading, setLoading] = React.useState<boolean>(false);
  const toast = useToast()
  const [key, Setkey] = React.useState(false)
  const [home, SetHome] = React.useState(false)
  const [abrir, SetAbrir] = React.useState(false)
  const [name, SetName] = React.useState('')
  const [courseName, SetcourseName] = React.useState('')
  const [registration, Setregistration] = React.useState('')
  const renderer = ({ minutes, seconds, completed }: any) => {
    if (completed) {
      SetHome(true)
      return (
        <Center>
          <Alert status='warning' rounded={'base'} textAlign='center'>
            Tempo acabou :(
          </Alert>
        </Center>
      )
    } else {
      return (
        <Center>
          <Alert status='warning' rounded={'base'} textAlign='center'>
            Você tem {String(minutes).substring(-2)}:{String(seconds).padStart(2, '0')}, para preencher tudo!
          </Alert>
        </Center>
      )
    }
  };
  const router = useRouter()
  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key) {
      if (e.key === '*') {
        Setkey(true)
        SetAbrir(false)
      }
      if (e.key === '#') {
        Setkey(false)
        SetAbrir(false)
      }
    }
  };
  async function onSubmitHandler(event: React.FormEvent): Promise<void> {
    event.preventDefault();
    try {
      setLoading(true)
      const { data } = await axios.get<Iuser>(`${process.env.API_ENDPOINT}/student/find/${registration}`)
      SetName(data.name)
      SetcourseName(data.courseName)
      SetAbrir(true)
    } catch (error: any) {
      toast({
        title: 'Não foi possível entrar no sistema!.',
        description: 'matrícula inexistente',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      SetAbrir(!true)
    } finally {
      setLoading(false)
    }
  };
  React.useEffect(() => {
    if (key) {
      router.push(`challenge/${registration}`)
    }
    if (home) {
      router.push(`/`)
    }
  }, [key, home])
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg='gray.600'
      onKeyDown={handleInputKeyPress}
    >
      <Head>
        <title>Crânio | Login</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <ModalAlert abrir={abrir} name={name} courseName={courseName} />
      <Stack
        as='form'
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg='gray.800'
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        onSubmit={onSubmitHandler}
        my={12}>
        <Heading lineHeight={1.1} color='white' fontSize={{ base: '2xl', md: '3xl' }}>
          Coloque sua matrícula
        </Heading>

        <FormControl>
          <Input
            placeholder="Usuário"
            type="number"
            autoFocus
            onChange={(e) => Setregistration(e.target.value)}
            color='white'
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            leftIcon={<AiOutlineSend />}
            isLoading={loading}
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}>
            Enter
          </Button>
        </Stack>
        <Countdown
          date={Date.now() + 2 * 60 * 1000}
          renderer={renderer}
        />
      </Stack>
    </Flex>
  );
}