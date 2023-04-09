import React from 'react'
import './CAStyles.scss'
import Footer from '../../components/HomePage/Footer'
import FAQIems from '../../components/HomePage/FAQIems'

const CAPortal = () => {

    const faqs = [
        {
            question: 'How to I become a campus ambassador ?',
            answer: "In order to become a campus ambassador you need to visit  kaizenaiimspatna.com/ca and register yourself by providing the required details.",
            color: "yellow",
        },
        {
            question: 'Who can become a campus ambassador ?',
            answer: "You only need to be a college student in order to become a part of the campus ambassador program. All you need is a valid college ID and you are good to go.",
            color: "red",
        },
        {
            question: 'How can CA  get assistance from team KAIZEN when required?',
            answer: 'You can contact team KAIZEN by "contact us" section available on the CA website. Our team will get back to  you through the email address or phone number provided by you.',
            color: "blue",
        }
    ]

    return (
        <>
            <div className='ca-container'>
                <div className='ca-banner'>
                    <div className='ca-head-left'>
                        <h2 className='ca-head-text'>Campus Ambassador</h2>
                        <p>Be the emissary of Kaizen 2022</p>
                        <div className='ca-btn-container'>
                            <button className='ca-signup-btn'>Sign Up</button>
                            <button className='ca-explore-btn'>Explore</button>
                        </div>
                    </div>
                    <div className='ca-head-right'>
                        <img src='https://i0.wp.com/trustidea.org/wp-content/uploads/2020/12/9-e1610547225443.png?fit=550%2C400&ssl=1' alt='CA Banner' />
                    </div>
                </div>



                <div className="page-2" id="explore"><div className="spacerv-md"></div>
                    <h2 className="page-2-heading">What you should do</h2>
                    <div className="page-2-cards-wrapper">
                        <div className="page-2-card-wrapper">
                            <div className="card-wrapper">
                                <div className="card-bg"></div>
                                <div className="ca-card">
                                    <div className="ringed-icon">
                                        <div className="ring"></div>
                                        <div className="ring"></div>
                                        <div className="ring"></div>
                                        <div className="icon-wrapper">
                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M383.822 344.427c-16.045 0-31.024 5.326-41.721 15.979l-152.957-88.42c1.071-5.328 2.142-9.593 2.142-14.919 0-5.328-1.071-9.593-2.142-14.919l150.826-87.35c11.762 10.653 26.741 17.041 43.852 17.041 35.295 0 64.178-28.766 64.178-63.92C448 72.767 419.117 44 383.822 44c-35.297 0-64.179 28.767-64.179 63.92 0 5.327 1.065 9.593 2.142 14.919l-150.821 87.35c-11.767-10.654-26.741-17.041-43.856-17.041-35.296 0-63.108 28.766-63.108 63.92 0 35.153 28.877 63.92 64.178 63.92 17.115 0 32.089-6.389 43.856-17.042l151.891 88.421c-1.076 4.255-2.141 8.521-2.141 13.847 0 34.094 27.806 61.787 62.037 61.787 34.229 0 62.036-27.693 62.036-61.787.001-34.094-27.805-61.787-62.035-61.787z"></path></svg>
                                        </div>
                                    </div>
                                    <h4 className="clash-sb">Share</h4>
                                    <p className="clash-r">Share all posters and links on your social media and groups</p>
                                </div>
                            </div>
                        </div>
                        <div className="page-2-card-wrapper">
                            <div className="card-wrapper">
                                <div className="card-bg"></div>
                                <div className="ca-card"><div className="ringed-icon">
                                    <div className="ring"></div><div className="ring"></div><div className="ring"></div><div className="icon-wrapper"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M8.586 17H3v-2h18v2h-5.586l3.243 3.243-1.414 1.414L13 17.414V20h-2v-2.586l-4.243 4.243-1.414-1.414L8.586 17zM5 3h14a1 1 0 0 1 1 1v10H4V4a1 1 0 0 1 1-1z"></path></g></svg></div></div><h4 className="clash-sb">Notices</h4><p className="clash-r">Put up posters we send you on your notice boards</p></div></div></div><div className="page-2-card-wrapper"><div className="card-wrapper"><div className="card-bg"></div><div className="ca-card"><div className="ringed-icon"><div className="ring"></div><div className="ring"></div><div className="ring"></div><div className="icon-wrapper"><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M488 192H336v56c0 39.7-32.3 72-72 72s-72-32.3-72-72V126.4l-64.9 39C107.8 176.9 96 197.8 96 220.2v47.3l-80 46.2C.7 322.5-4.6 342.1 4.3 357.4l80 138.6c8.8 15.3 28.4 20.5 43.7 11.7L231.4 448H368c35.3 0 64-28.7 64-64h16c17.7 0 32-14.3 32-32v-64h8c13.3 0 24-10.7 24-24v-48c0-13.3-10.7-24-24-24zm147.7-37.4L555.7 16C546.9.7 527.3-4.5 512 4.3L408.6 64H306.4c-12 0-23.7 3.4-33.9 9.7L239 94.6c-9.4 5.8-15 16.1-15 27.1V248c0 22.1 17.9 40 40 40s40-17.9 40-40v-88h184c30.9 0 56 25.1 56 56v28.5l80-46.2c15.3-8.9 20.5-28.4 11.7-43.7z"></path></svg></div></div><h4 className="clash-sb">Encourage</h4><p className="clash-r">Encourage students of your college to participate in Kaizen</p></div></div></div></div>
                    <div className="spacerv-md"></div>
                </div>

            </div>

            <div className='m-auto max-w-[80rem] px-6 py-16'>

                <div>
                    <h2 className='text-6xl leading-[5rem] font-bold'>What is <br /><span className='text-underline'>Campus Ambassador</span><br /> Program?</h2>
                    <p className='py-16 leading-8 font-light opacity-70 text-lg'>As a part of the campus ambassador programme, KAIZEN offers students the chance to represent and promote the organization at their colleges and universities. Their responsibilities comprise developing our pressure and promoting KAIZEN events among students & educators by serving as a link between their college and us.
                    </p>
                </div>

                <div>
                    <h2 className='text-6xl font-bold pb-10'>Why <span className='text-underline'>CA</span>?</h2>
                    <ul className='list-type'>
                        <li><p className='py-5 leading-8 font-light opacity-70 text-lg'>The most significant opportunity to represent your college in one of the biggest med-fest in Eastern India, improving your leadership qualities.</p></li>
                        <li><p className='py-5 leading-8 font-light opacity-70 text-lg'>Build and expand your network with other colleges and their Campus Ambassador.</p></li>
                        <li>
                            <p className='py-5 leading-8 font-light opacity-70 text-lg'>Get a chance to be a part of the KAIZEN team and get a chance to work with the best minds of the country.</p>
                        </li>
                        <li>
                            <p className='py-5 leading-8 font-light opacity-70 text-lg'>Build and develop your leadership skills.</p>
                        </li>
                    </ul>
                </div>

            </div>

            <div className='bg-gray-900 pb-[5rem]'>
                <div>
                    <h1 className='text-4xl font-bold text-center py-16'>Incentives</h1>
                    <div className='grid grid-cols-3 m-auto max-w-[75rem] gap-[3rem]'>
                        <div className='flex items-center justify-center flex-col'>
                            <div className='h-fit w-[15rem] overflow-hidden flex items-center justify-center rounded-2xl bg-pink-600'>
                                <img className='h-auto w-[100%]' src="https://img.freepik.com/free-vector/halloween-card-ticket-design-luxury-gradient-colorful_483537-1990.jpg" alt="" />
                            </div>
                            <h2 className='text-pink-600 text-lg font-medium'>Event Passes</h2>
                        </div>

                        <div className='flex items-center justify-center flex-col'>
                            <div className='h-fit w-[15rem] overflow-hidden flex items-center justify-center rounded-2xl bg-pink-600'>
                                <img className='h-auto w-[100%]' src="https://img.freepik.com/free-vector/halloween-card-ticket-design-luxury-gradient-colorful_483537-1990.jpg" alt="" />
                            </div>
                            <h2>Prizes/Goodies</h2>
                        </div>

                        <div className='flex items-center justify-center flex-col' >
                            <div className='h-fit w-[15rem] overflow-hidden flex items-center justify-center rounded-2xl bg-pink-600'>
                                <img className='h-auto w-[100%]' src="https://img.freepik.com/free-vector/halloween-card-ticket-design-luxury-gradient-colorful_483537-1990.jpg" alt="" />
                            </div>
                            <h2>Merchandise</h2>
                        </div>

                        <div className='flex items-center justify-center flex-col'>
                            <div className='h-fit w-[15rem] overflow-hidden flex items-center justify-center rounded-2xl bg-pink-600'>
                                <img className='h-auto w-[100%]' src="https://img.freepik.com/free-vector/halloween-card-ticket-design-luxury-gradient-colorful_483537-1990.jpg" alt="" />
                            </div>
                            <h2>Workshop</h2>
                        </div>


                        <div className='flex items-center justify-center flex-col'>
                            <div className='h-fit w-[15rem] overflow-hidden flex items-center justify-center rounded-2xl bg-pink-600'>
                                <img className='h-auto w-[100%]' src="https://img.freepik.com/free-vector/halloween-card-ticket-design-luxury-gradient-colorful_483537-1990.jpg" alt="" />
                            </div>
                            <h2>Certificates</h2>
                        </div>

                        <div className='flex items-center justify-center flex-col'>
                            <div className='h-fit w-[15rem] overflow-hidden flex items-center justify-center rounded-2xl bg-pink-600'>
                                <img className='h-auto w-[100%]' src="https://img.freepik.com/free-vector/halloween-card-ticket-design-luxury-gradient-colorful_483537-1990.jpg" alt="" />
                            </div>
                            <h2>Event Passes</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative bg-no-repeat min-h-fit bg-center bg-cover w-[100%] bg-[url('https://ragam.co.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftheyyam%202.98e82130.png&w=1080&q=75')]">
            <div className='flex lg:flex-row md:flex-row flex-col justify-between lg:items-start md:items-start items-center absolute w-[100%] lg:top-[20%] md:top-[20%] top-[10%] z-0 h-[32rem]'>
                {/* <img src="coin.png" alt="wheel" data-aos="fade-up-right" className='lg:h-[17rem] md:h-[15rem] h-[15rem] brightness-75' />
                <img src="hat.png" alt="hat" data-aos="zoom-in-up" className='lg:h-[22rem] md:h-[20rem] h-[15rem] self-end brightness-75' />
                <img src="map.png" alt="cpmpass" data-aos="fade-up-left" className='lg:h-[17rem] md:h-[15rem] h-[15rem] brightness-75' /> */}
            </div>

            <div className='flex flex-col bg-opacity-20 backdrop-blur-0 rounded-[2rem] lg:w-[70%] w-[90%] m-auto z-[1999999]'>
                <h3 className='text-center font-bold text-4xl pt-20 text-yellow-500 decoration-red-500 underline underline-offset[1px]'>FAQs</h3>
                <div className='flex flex-col items-center justify-center py-24 gap-6'>
                    {
                        faqs.map((faq, index) => (
                            <FAQIems key={index} faq={faq} />
                        ))
                    }
                </div>
            </div>

        </div>
        </>
    )
}

export default CAPortal