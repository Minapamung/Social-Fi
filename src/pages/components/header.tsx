"use client"
import React, { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import { Aclonica } from 'next/font/google';
import styles from './header.module.css';
import {signOut, useSession} from 'next-auth/react'
import { useRouter } from 'next/router';
import { UserContext } from '../../contexts/UserProvider';

const aclonica = Aclonica({
  weight: '400',
  subsets: ['latin']
})


const Header = () => {
  const {data: session, status} = useSession();
  const Fulldata = useContext(UserContext)
  const router = useRouter();
  const [navshow, setNavshow] = useState(false);
  const [profile, setProfile] = useState();
  const [avatar, setAvatar] = useState('/avatars/default.svg');
  const [username, setName] = useState();
  const [screenName, setScreenName] = useState();

  useEffect(() => {
    if (status == 'authenticated') {
      // @ts-ignore
      setProfile(session.token.token.profile);
    }
  }, [session])

  useEffect(() => {
    if (profile) {
      //@ts-ignore
      setAvatar(profile.profile_image_url_https)
      //@ts-ignore
      setName(profile.name)
      //@ts-ignore
      setName(profile.name)
      Fulldata?.setMyProfile(profile);
    }
  }, [profile])

  return (
    <div className='w-full'>
      <div className='px-5 md:px-10 py-4 sm:py-[22px] flex justify-between max-sm:gap-6 items-center max-w-[1240px] bg-white mx-auto'>
        <div className='flex gap-2 items-center justify-center cursor-pointer' onClick={() => {router.push('/')}}>
          <Image src={'/icons/logo.svg'} width={100} height={100} alt='logo' className='w-[43.243px] sm:w-[64.865px] h-8 sm:h-12' />
          <h1 className={`text-[14px] sm:text-[18px] font-normal leading-[normal] text-primary ${aclonica.className} w-[73px] sm:w-[94px]`}>
            The sahara
          </h1>
        </div>
        <div className='flex gap-2'>
          <input type="text" className={`max-md:hidden w-[300px] border px-8 py-2 rounded-[100px] border-solid border-[#E7EAF0] bg-[#F9FAFC]  bg-[url("/icons/search.svg")] bg-no-repeat ${styles.searchinput}`} placeholder='Search' />
          <span className='flex w-[120px] items-center gap-2 border pl-2 pr-4 py-2 rounded-[100px] border-solid border-[#E7EAF0] bg-[#F9FAFC] cursor-pointer' onClick={() => {signOut({callbackUrl: '/'})}}>
            <Image src={'/icons/cardano.svg'} width={'100'} height={'100'} alt='Cardano avatar' className='w-6 h-6' />
            <span className='text-center text-base not-italic font-semibold leading-6 text-primary'>200</span>
          </span>
          <Image src={avatar} width={'100'} height={'100'} alt='Default avatar' className='w-10 h-10 rounded-full border-2 border-solid border-[#E7EAF0] cursor-pointer' />
        </div>
      </div>
    </div>
  )
}

export default Header;