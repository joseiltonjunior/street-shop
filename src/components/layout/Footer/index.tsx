import logo from '@/assets/logo-name.png'

import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-orange-500 w-full  ml-auto mr-auto text-gray-800 mt-8">
      <div className="flex justify-between p-5 items-start md:flex-col">
        <Image src={logo} alt="logo footer" width={110} height={110} />

        <div className="flex flex-col gap-3 md:mt-4 p-2 font-medium">
          <Link href={'/'} className="hover:text-gray-700">
            Home
          </Link>
          <Link href={'/'} className="hover:text-gray-700">
            sobre
          </Link>
          <Link href={'/'} className="hover:text-gray-700">
            Termos e Condições
          </Link>
          <Link href={'/'} className="hover:text-gray-700">
            Política de Envio e Devolução
          </Link>
        </div>
        <div className="flex flex-col gap-3 p-2 font-medium">
          <Link href={'/'} className="hover:text-gray-700">
            Política de Privacidade
          </Link>
          <Link href={'/'} className="hover:text-gray-700">
            FAQ
          </Link>
        </div>
      </div>

      <div className="flex justify-between items-center text-orange-500 p-4 bg-gray-800 mt-4 md:flex-col md:gap-4 text-sm">
        <div className="flex flex-col md:items-center">
          <strong>{`D'Coffee Shop`} 2023</strong>
          <span>Todos os direitos reservados</span>
        </div>

        <div>
          <span>Criado por </span>
          <Link href={'https://ferreirajr.tech'} target="_blank">
            <strong>Junior Ferreira</strong>
          </Link>
        </div>
      </div>
    </footer>
  )
}
