import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Legals = () => {
    const { pageName } = useParams("");
    const [page, setPage] = useState(0);

    useEffect(() => {
        if (pageName === "privacy-policy") setPage(0);
        if (pageName === "terms-of-service") setPage(1);
        if (pageName === "refund-policy") setPage(2);
        if (pageName === "code-of-conduct") setPage(3);
    }, [pageName]);



    const data = [
        {
            title: "Privacy Policy",
            content: "Lorem Privacy ipsum dolor sit amet consectetur adipisicing elit. Unde velit aspernatur nihil perferendis eligendi magnam, repellendus consequuntur beatae ut facere? Pariatur natus iusto non reiciendis amet alias blanditiis aperiam numquam dolore tenetur fugit eum dolorem, suscipit, vero laborum beatae error voluptatum unde eos ullam itaque. Asperiores, nemo eius explicabo reprehenderit recusandae ullam. Possimus eum error tempora iste nam numquam quo maxime inventore architecto? Deleniti libero voluptatum, quasi eaque harum ut tempore. Hic minima similique quis, dolor sunt suscipit dolorum vitae blanditiis possimus quod commodi enim, excepturi recusandae. Earum maxime, aperiam velit assumenda officiis provident reiciendis in libero illum accusantium quod, nulla quas sunt laborum consequuntur expedita minima optio iusto adipisci minus similique, dolorem veritatis aliquid deleniti. Accusamus aliquam delectus praesentium! Officia saepe praesentium perspiciatis? Numquam maiores reiciendis dolore placeat eaque iusto vero ipsum et quo, libero alias nesciunt aut inventore sed nulla nihil aliquid odit officia iste dolor dolorem minima sunt, quis aperiam. Voluptatibus reprehenderit ipsa accusamus adipisci quod cupiditate saepe, doloremque non porro cumque consequuntur eligendi perferendis minus nesciunt error recusandae vitae illo fugit magnam est pariatur. Libero nulla in illum, officiis consequatur cum quo labore iste sunt nam neque numquam consectetur iusto ratione error temporibus beatae, corrupti voluptatibus tempora nostrum. Incidunt enim quisquam error reiciendis quasi est vero quae blanditiis molestias ratione, aliquid possimus fugit accusantium sapiente neque perspiciatis in veniam sit, provident eligendi excepturi repudiandae. Doloribus harum ex vero voluptas. Molestias, consectetur unde! Libero esse enim ducimus amet beatae nisi itaque nobis, repudiandae eaque velit sint sapiente molestiae pariatur similique possimus cum unde necessitatibus voluptates, at perferendis non quisquam. Recusandae ipsum, fugiat odit ut voluptatem inventore soluta dignissimos iure atque facilis aspernatur molestias eligendi voluptatibus blanditiis tempora ipsam provident optio, exercitationem libero ratione error sint repellendus quos temporibus! Sapiente rerum fuga voluptatibus natus repudiandae. Mollitia, quisquam delectus. Fugiat consequuntur earum qui? Molestias minus saepe suscipit pariatur cumque. Natus quas voluptate odio? Fugiat aliquam eveniet molestias pariatur eaque ea, quisquam nesciunt in repellendus esse blanditiis, error nostrum mollitia cupiditate doloremque modi eligendi veritatis praesentium hic? Accusamus, eius at optio magnam perferendis labore suscipit illo fuga quas ut aperiam laboriosam aspernatur sequi. Ut culpa, alias possimus autem delectus ipsum nesciunt ullam facilis labore cumque error voluptatem voluptatum commodi quos placeat incidunt aperiam maiores dolor animi maxime minima, quasi deleniti dolore. Nihil fugit ex eveniet distinctio voluptates nostrum, voluptatum error, sed, tempora dignissimos nesciunt ratione possimus impedit reiciendis perspiciatis et?",
            id: 0
        },
        {
            title: "Terms of Service",
            content: "Lorem Terms Terms dolor sit amet consectetur adipisicing elit. Unde velit aspernatur nihil perferendis eligendi magnam, repellendus consequuntur beatae ut facere? Pariatur natus iusto non reiciendis amet alias blanditiis aperiam numquam dolore tenetur fugit eum dolorem, suscipit, vero laborum beatae error voluptatum unde eos ullam itaque. Asperiores, nemo eius explicabo reprehenderit recusandae ullam. Possimus eum error tempora iste nam numquam quo maxime inventore architecto? Deleniti libero voluptatum, quasi eaque harum ut tempore. Hic minima similique quis, dolor sunt suscipit dolorum vitae blanditiis possimus quod commodi enim, excepturi recusandae. Earum maxime, aperiam velit assumenda officiis provident reiciendis in libero illum accusantium quod, nulla quas sunt laborum consequuntur expedita minima optio iusto adipisci minus similique, dolorem veritatis aliquid deleniti. Accusamus aliquam delectus praesentium! Officia saepe praesentium perspiciatis? Numquam maiores reiciendis dolore placeat eaque iusto vero ipsum et quo, libero alias nesciunt aut inventore sed nulla nihil aliquid odit officia iste dolor dolorem minima sunt, quis aperiam. Voluptatibus reprehenderit ipsa accusamus adipisci quod cupiditate saepe, doloremque non porro cumque consequuntur eligendi perferendis minus nesciunt error recusandae vitae illo fugit magnam est pariatur. Libero nulla in illum, officiis consequatur cum quo labore iste sunt nam neque numquam consectetur iusto ratione error temporibus beatae, corrupti voluptatibus tempora nostrum. Incidunt enim quisquam error reiciendis quasi est vero quae blanditiis molestias ratione, aliquid possimus fugit accusantium sapiente neque perspiciatis in veniam sit, provident eligendi excepturi repudiandae. Doloribus harum ex vero voluptas. Molestias, consectetur unde! Libero esse enim ducimus amet beatae nisi itaque nobis, repudiandae eaque velit sint sapiente molestiae pariatur similique possimus cum unde necessitatibus voluptates, at perferendis non quisquam. Recusandae ipsum, fugiat odit ut voluptatem inventore soluta dignissimos iure atque facilis aspernatur molestias eligendi voluptatibus blanditiis tempora ipsam provident optio, exercitationem libero ratione error sint repellendus quos temporibus! Sapiente rerum fuga voluptatibus natus repudiandae. Mollitia, quisquam delectus. Fugiat consequuntur earum qui? Molestias minus saepe suscipit pariatur cumque. Natus quas voluptate odio? Fugiat aliquam eveniet molestias pariatur eaque ea, quisquam nesciunt in repellendus esse blanditiis, error nostrum mollitia cupiditate doloremque modi eligendi veritatis praesentium hic? Accusamus, eius at optio magnam perferendis labore suscipit illo fuga quas ut aperiam laboriosam aspernatur sequi. Ut culpa, alias possimus autem delectus ipsum nesciunt ullam facilis labore cumque error voluptatem voluptatum commodi quos placeat incidunt aperiam maiores dolor animi maxime minima, quasi deleniti dolore. Nihil fugit ex eveniet distinctio voluptates nostrum, voluptatum error, sed, tempora dignissimos nesciunt ratione possimus impedit reiciendis perspiciatis et?",
            id: 1
        },
        {
            title: "Refund Policy",
            content: "Lorem Refund Terms Terms dolor sit amet consectetur adipisicing elit. Unde velit aspernatur nihil perferendis eligendi magnam, repellendus consequuntur beatae ut facere? Pariatur natus iusto non reiciendis amet alias blanditiis aperiam numquam dolore tenetur fugit eum dolorem, suscipit, vero laborum beatae error voluptatum unde eos ullam itaque. Asperiores, nemo eius explicabo reprehenderit recusandae ullam. Possimus eum error tempora iste nam numquam quo maxime inventore architecto? Deleniti libero voluptatum, quasi eaque harum ut tempore. Hic minima similique quis, dolor sunt suscipit dolorum vitae blanditiis possimus quod commodi enim, excepturi recusandae. Earum maxime, aperiam velit assumenda officiis provident reiciendis in libero illum accusantium quod, nulla quas sunt laborum consequuntur expedita minima optio iusto adipisci minus similique, dolorem veritatis aliquid deleniti. Accusamus aliquam delectus praesentium! Officia saepe praesentium perspiciatis? Numquam maiores reiciendis dolore placeat eaque iusto vero ipsum et quo, libero alias nesciunt aut inventore sed nulla nihil aliquid odit officia iste dolor dolorem minima sunt, quis aperiam. Voluptatibus reprehenderit ipsa accusamus adipisci quod cupiditate saepe, doloremque non porro cumque consequuntur eligendi perferendis minus nesciunt error recusandae vitae illo fugit magnam est pariatur. Libero nulla in illum, officiis consequatur cum quo labore iste sunt nam neque numquam consectetur iusto ratione error temporibus beatae, corrupti voluptatibus tempora nostrum. Incidunt enim quisquam error reiciendis quasi est vero quae blanditiis molestias ratione, aliquid possimus fugit accusantium sapiente neque perspiciatis in veniam sit, provident eligendi excepturi repudiandae. Doloribus harum ex vero voluptas. Molestias, consectetur unde! Libero esse enim ducimus amet beatae nisi itaque nobis, repudiandae eaque velit sint sapiente molestiae pariatur similique possimus cum unde necessitatibus voluptates, at perferendis non quisquam. Recusandae ipsum, fugiat odit ut voluptatem inventore soluta dignissimos iure atque facilis aspernatur molestias eligendi voluptatibus blanditiis tempora ipsam provident optio, exercitationem libero ratione error sint repellendus quos temporibus! Sapiente rerum fuga voluptatibus natus repudiandae. Mollitia, quisquam delectus. Fugiat consequuntur earum qui? Molestias minus saepe suscipit pariatur cumque. Natus quas voluptate odio? Fugiat aliquam eveniet molestias pariatur eaque ea, quisquam nesciunt in repellendus esse blanditiis, error nostrum mollitia cupiditate doloremque modi eligendi veritatis praesentium hic? Accusamus, eius at optio magnam perferendis labore suscipit illo fuga quas ut aperiam laboriosam aspernatur sequi. Ut culpa, alias possimus autem delectus ipsum nesciunt ullam facilis labore cumque error voluptatem voluptatum commodi quos placeat incidunt aperiam maiores dolor animi maxime minima, quasi deleniti dolore. Nihil fugit ex eveniet distinctio voluptates nostrum, voluptatum error, sed, tempora dignissimos nesciunt ratione possimus impedit reiciendis perspiciatis et?",
            id: 2
        },
        {
            title: "Code of Conduct",
            content: "Lorem Code Refund Terms Terms dolor sit amet consectetur adipisicing elit. Unde velit aspernatur nihil perferendis eligendi magnam, repellendus consequuntur beatae ut facere? Pariatur natus iusto non reiciendis amet alias blanditiis aperiam numquam dolore tenetur fugit eum dolorem, suscipit, vero laborum beatae error voluptatum unde eos ullam itaque. Asperiores, nemo eius explicabo reprehenderit recusandae ullam. Possimus eum error tempora iste nam numquam quo maxime inventore architecto? Deleniti libero voluptatum, quasi eaque harum ut tempore. Hic minima similique quis, dolor sunt suscipit dolorum vitae blanditiis possimus quod commodi enim, excepturi recusandae. Earum maxime, aperiam velit assumenda officiis provident reiciendis in libero illum accusantium quod, nulla quas sunt laborum consequuntur expedita minima optio iusto adipisci minus similique, dolorem veritatis aliquid deleniti. Accusamus aliquam delectus praesentium! Officia saepe praesentium perspiciatis? Numquam maiores reiciendis dolore placeat eaque iusto vero ipsum et quo, libero alias nesciunt aut inventore sed nulla nihil aliquid odit officia iste dolor dolorem minima sunt, quis aperiam. Voluptatibus reprehenderit ipsa accusamus adipisci quod cupiditate saepe, doloremque non porro cumque consequuntur eligendi perferendis minus nesciunt error recusandae vitae illo fugit magnam est pariatur. Libero nulla in illum, officiis consequatur cum quo labore iste sunt nam neque numquam consectetur iusto ratione error temporibus beatae, corrupti voluptatibus tempora nostrum. Incidunt enim quisquam error reiciendis quasi est vero quae blanditiis molestias ratione, aliquid possimus fugit accusantium sapiente neque perspiciatis in veniam sit, provident eligendi excepturi repudiandae. Doloribus harum ex vero voluptas. Molestias, consectetur unde! Libero esse enim ducimus amet beatae nisi itaque nobis, repudiandae eaque velit sint sapiente molestiae pariatur similique possimus cum unde necessitatibus voluptates, at perferendis non quisquam. Recusandae ipsum, fugiat odit ut voluptatem inventore soluta dignissimos iure atque facilis aspernatur molestias eligendi voluptatibus blanditiis tempora ipsam provident optio, exercitationem libero ratione error sint repellendus quos temporibus! Sapiente rerum fuga voluptatibus natus repudiandae. Mollitia, quisquam delectus. Fugiat consequuntur earum qui? Molestias minus saepe suscipit pariatur cumque. Natus quas voluptate odio? Fugiat aliquam eveniet molestias pariatur eaque ea, quisquam nesciunt in repellendus esse blanditiis, error nostrum mollitia cupiditate doloremque modi eligendi veritatis praesentium hic? Accusamus, eius at optio magnam perferendis labore suscipit illo fuga quas ut aperiam laboriosam aspernatur sequi. Ut culpa, alias possimus autem delectus ipsum nesciunt ullam facilis labore cumque error voluptatem voluptatum commodi quos placeat incidunt aperiam maiores dolor animi maxime minima, quasi deleniti dolore. Nihil fugit ex eveniet distinctio voluptates nostrum, voluptatum error, sed, tempora dignissimos nesciunt ratione possimus impedit reiciendis perspiciatis et?",
            id: 3
        }
    ]

    return (
        <div className="bg-[url('/images/list-bg.png')] bg-repeat-y  min-h-screen bg-center bg-cover pt-16 pb-20 flex relative">


            <div className="bg-[#E9CC7E] border-img2  bg-opacity-10 backdrop-blur-sm rounded-xl lg:w-[80%] md:w-[95%] w-[95%] bg-center m-auto mt-12 md:mt-14 lg:mt-16 h-fit ">
                <div className="flex relative items-center justify-center m-[auto] my-[-1.5rem] border-img1 w-[50%] h-10 lg:h-12 bg-[#400000] bg-opacity-70 backdrop-blur-sm">
                    <p className='text-xl lg:text-2xl font-bold text-yellow-200 px-5'>{
                        data[page].title
                    }</p>
                </div>

                <div className="flex justify-center items-center pt-16 gap-3 flex-wrap px-2">
                    <button onClick={() => setPage(1)} className={
                        page === 1 ? "bg-yellow-200 bg-opacity-70 backdrop-blur-sm text-[#400000] px-4 py-1.5 rounded-lg font-bold text-sm" : "bg-[#400000] bg-opacity-70 backdrop-blur-sm text-yellow-200 px-4 py-1.5 rounded-lg font-bold text-sm"
                    }>Terms & Conditions</button>
                    <button onClick={() => setPage(2)} className={
                        page === 2 ? "bg-yellow-200 bg-opacity-70 backdrop-blur-sm text-[#400000] px-4 py-1.5 rounded-lg font-bold text-sm" : "bg-[#400000] bg-opacity-70 backdrop-blur-sm text-yellow-200 px-4 py-1.5 rounded-lg font-bold text-sm"
                    }>Refund Policy</button>
                    <button onClick={() => setPage(3)} className={
                        page === 3 ? "bg-yellow-200 bg-opacity-70 backdrop-blur-sm text-[#400000] px-4 py-1.5 rounded-lg font-bold text-sm" : "bg-[#400000] bg-opacity-70 backdrop-blur-sm text-yellow-200 px-4 py-1.5 rounded-lg font-bold text-sm"
                    }>Code of Conduct</button>
                    <button onClick={() => setPage(0)} className={
                        page === 0 ? "bg-yellow-200 bg-opacity-70 backdrop-blur-sm text-[#400000] px-4 py-1.5 rounded-lg font-bold text-sm" : "bg-[#400000] bg-opacity-70 backdrop-blur-sm text-yellow-200 px-4 py-1.5 rounded-lg font-bold text-sm"
                    }>Privacy Policy</button>
                </div>

                <div className='px-5 md:px-10 lg:px-10 text-justify first-letter:text-2xl first-letter:pl-10 pt-10 pb-10'>
                    <p>
                        {data[page].content}
                    </p>
                </div>

                <div className='flex items-center justify-center gap-3 pb-16'>
                    <div className='h-3 w-3 bg-yellow-200 rotate-45'/>
                    <div className='h-3 w-3 bg-yellow-200 rotate-45'/>
                    <div className='h-3 w-3 bg-yellow-200 rotate-45'/>
                </div>

            </div>
        </div>
    )
}

export default Legals