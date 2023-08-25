'use client'
import Image from 'next/image'
import Cover from '../image/cover (1).jpg'
import JJLogo from '../image/jj.png'
import Cover2 from '../image/cover (2).jpg'
import Cover3 from '../image/cover (3).jpg'
import Author1 from '../image/joe.jpeg'
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";


export default function Home() {
    const router = useRouter()
    useEffect(() => {
        router.prefetch('/posts');
    }, [router]);


    const fetchPosts = async () => {
        const response = await axios.get('http://localhost:3000/posts');
        return response.data;
    };

    const {data: posts, error, isLoading} = useQuery({queryKey: ['posts'], queryFn: fetchPosts})

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            {posts.length > 0 && (
                <div className='flex flex-col w-full justify-center items-center'>
                    <div className='max-w-5xl w-full'>
                        <div className='flex flex-col items-center mt-20 sm:flex-row sm:justify-between sm:pl-3'>
                            <span className='text-4xl font-bold'>Blog.</span>
                            <span className='px-6 mt-3 text-center'>A statically generated blog example using <a
                                href='https://nextjs.org/' className='underline'>Next.js</a> and Markdown</span>
                        </div>
                        <div className='w-full px-4 mt-12'>
                            <Image src={Cover2} alt='' className='h-52 md:h-fit cursor-pointer'
                                   onClick={() => router.push(`/posts/${posts[0].id}`)}/>
                        </div>
                        <div className='sm:grid sm:grid-cols-2 mt-8'>
                            <div className='px-4 flex flex-col sm:mt-3'>
                      <span className='text-2xl font-semibold mb-3 hover:underline'
                            onClick={() => router.push(`/posts/${posts[0].id}`)}>
                        {posts[0].title}
                      </span>
                                <span>{posts[0].date}</span>
                            </div>
                            <div className='px-4 mt-5 flex flex-col'>
                      <span className=''>
                        {posts[0].content.split(' ').length > 100 &&
                            posts[0].content.split(' ').slice(0, 59).join(' ') + '.......'
                        }
                      </span>

                                <div className="mt-2 flex">
                                    <Image src={JJLogo} alt='' className='w-12 h-12'></Image>
                                    <span className='font-bold text-lg ml-2 mt-2'>{posts[0].author}</span>
                                </div>
                            </div>
                        </div>

                        {/*More Stories*/}
                        <div className='flex flex-col items-start mt-14 px-3'>
                            <span className='text-4xl font-bold mb-5'>More Stories</span>
                        </div>

                        <div className='md:grid md:grid-cols-2'>
                            {/*News Div*/}
                            <div className='mt-8 md:mr-4'>
                                <Image src={Cover3} alt='' className='h-52 mb-2 px-3 cursor-pointer'
                                       onClick={() => router.push(`/posts/${posts[1].id}`)}/>
                                <div className='px-4 flex flex-col sm:mt-3'>
                                    <span className='text-2xl font-semibold mb-3 hover:underline'
                                          onClick={() => router.push(`/posts/${posts[1].id}`)}>{posts[1].title}</span>
                                    <span>March 16, 2020</span>
                                </div>
                                <div className='px-4 mt-5 flex flex-col'>
                                  <span>
                                     {posts[1].content.split(' ').length > 100 &&
                                         posts[1].content.split(' ').slice(0, 59).join(' ') + '.......'
                                     }
                                  </span>
                                    <div className="mt-3 flex">
                                        <Image src={Author1} alt='' className='w-12 h-12 rounded-full'></Image>
                                        <span className='font-bold text-lg ml-2 mt-2'>{posts[1].author}</span>
                                    </div>
                                </div>
                            </div>

                            {/*News Div*/}
                            <div className='mt-8 pb-32 md:ml-4'>
                                <Image src={Cover} alt='' className='h-52 mb-2 px-3 cursor-pointer'
                                       onClick={() => router.push(`/posts/${posts[2].id}`)}/>
                                <div className='px-4 flex flex-col sm:mt-3'>
                                    <span className='text-2xl font-semibold mb-3 hover:underline'
                                          onClick={() => router.push(`/posts/${posts[2].id}`)}>{posts[2].title}</span>
                                    <span>March 16, 2020</span>
                                </div>
                                <div className='px-4 mt-5 flex flex-col'>
                                  <span>
                                      {posts[2].content.split(' ').length > 100 &&
                                          posts[2].content.split(' ').slice(0, 59).join(' ') + '.......'
                                      }
                                  </span>
                                    <div className="mt-3 flex">
                                        <Image src={Author1} alt='' className='w-12 h-12 rounded-full'></Image>
                                        <span className='font-bold text-lg ml-2 mt-2'>{posts[2].author}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*Footer*/}
                        <div
                            className='bg-gray-200 flex flex-col  md:grid md:grid-cols-6 justify-center items-center text-center px-3 sm:px-2 py-20'>
                            <span
                                className='font-bold text-3xl col-span-3 mr-3'>Statically Generated with Next.js.</span>
                            <button
                                className='bg-black px-10 py-3 sm:mx-10 border col-span-2 text-white my-8 font-medium hover:bg-white hover:text-black duration-300 hover:border-black'>
                                <a href="https://nextjs.org/">Read Documentation</a></button>
                            <span className='font-bold'><a href='https://github.com/aungmyomyat4980/BlogFridayTest.git'>View on GitHub</a></span>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
