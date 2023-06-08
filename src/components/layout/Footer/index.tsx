import logo from '@/assets/new-logo.png'

import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-800 pt-10 pb-5 md:pl-5 pl-10 md:pr-5 pr-10 text-gray-800 w-full mt-auto">
      <div className="flex justify-between items-start mb-8 md:flex-col">
        <div className="flex items-center gap-2">
          <Image src={logo} alt="" width={40} height={40} />
          <div className="flex flex-col font-black">
            <span>{"D'Coffee"}</span>
            <span>{'Shop'}</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 md:mt-4 p-2">
          <Link href={'/'} className="hover:text-gray-500">
            Home
          </Link>
          <Link href={'/'} className="hover:text-gray-500">
            sobre
          </Link>
          <Link href={'/'} className="hover:text-gray-500">
            Termos e Condições
          </Link>
          <Link href={'/'} className="hover:text-gray-500">
            Política de Envio e Devolução
          </Link>
        </div>
        <div className="flex flex-col gap-3 p-2">
          <Link href={'/'} className="hover:text-gray-500">
            Política de Privacidade
          </Link>
          <Link href={'/'} className="hover:text-gray-500">
            FAQ
          </Link>
        </div>
      </div>

      <div className="flex justify-between items-center border-t-[1px] border-gray-400 mt-4 md:flex-col md:gap-4">
        <div className="flex flex-col mt-4 md:items-center">
          <span>{`D'Coffee Shop`} 2023</span>
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
