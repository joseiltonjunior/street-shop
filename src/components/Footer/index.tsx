import logo from '@/assets/dcoffee-logo.png'

import Image from 'next/image'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-white pt-10 pb-5 md:pl-5 pl-10 md:pr-5 pr-10 text-gray-800 w-full mt-auto">
      <div className="flex justify-between mb-8 md:flex-col">
        <Image src={logo} alt="" className="h-12 w-28 " />
        <div className="flex flex-col gap-3 md:mt-4">
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
        <div className="flex flex-col gap-3 md:mt-4">
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
          <strong>{`D'Coffee Shop`} 2023</strong>
          <span>Todos os direitos reservados</span>
        </div>

        <div>
          <span>Criado por </span>
          <Link href={'/'}>
            <strong>Junior Ferreira</strong>
          </Link>
        </div>
      </div>
    </footer>
  )
}
