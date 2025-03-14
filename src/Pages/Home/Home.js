import React, { useState } from 'react'
import "./Home.css"
import Header from '../../components/Header/Header'
import HeroBg from '../../components/HeroBg/HeroBg'
import Categories from '../../components/Categories/Categories'
import Pagination from '../../components/pagination/Pagination'
import Footer from '../../components/Footer/Footer'
import Auth from '../../auth/Auth'
import CatDisplay from '../../components/CatDisplay/CatDisplay'

const Home = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCatModelOpen, setIsCatModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");


  
  return (
    <div className='HomeWrapper'>
      <Header 
         setIsAuthModalOpen={setIsAuthModalOpen} 
         setIsCatModalOpen={setIsCatModalOpen} 
         setSearchQuery={setSearchQuery}
        />

      {!searchQuery && (
        <>
           <section style={{ width: "100%" }}>
              <HeroBg/>
            </section>
            <section>
               <Categories setSelectedCategory={setSelectedCategory} />
            </section>
        </>
      )}
      <section>
        {/* pagination numbering */}
        <Pagination selectedCategory={selectedCategory} searchQuery={searchQuery} />
      </section>
      <section style={{ width: "100%"}}>
        <Footer/>
      </section>

      {isAuthModalOpen && <Auth onClose={() => setIsAuthModalOpen(false)} />}
        {isCatModelOpen && <CatDisplay onClose={() => setIsCatModalOpen(false)} />}
    </div>
  )
}

export default Home