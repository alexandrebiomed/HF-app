import "../styles/Home.scss";

const Home = () => {
    
    return (
        <div className="home-container home"> 
            <section>
                <div className="section1 home-container">
                    <div className="text section1">
                        <div style={{display : "flex", wrap : "no-wrap", alignItems : "center"}}>
                            <h1> Amity, </h1>
                            <h2> &nbsp;strengthen family bonds</h2>
                        </div>
                        <p >
                            Create a supportive and harmonious environment where everyone feels valued.
                            By fostering kindness, open communication, and mutual respect, family members
                            build strong bonds that strengthen relationships and enhance collective happiness.
                            <br /><br />
                            Amity ensures that each member contributes to a loving and cohesive family unit,
                            making it a source of strength and joy.
                        </p>
                    </div>
                    <div className="image section1">
                        <img src="/images/FamillyDALLE2.png" alt="image" id="imageSection1" />
                    </div>
                </div>
            </section>

            <br />
            <hr id="hr1" className="hr-scrollable" />

            <section>
                <div className="section2 home-container">
                    <div className="image section2">
                        <img src="/images/FamillyDALLE3.png" alt="image" id="imageSection2" />
                    </div>
                    <div className="text section2">
                        <div style={{display : "flex", wrap : "no-wrap", alignItems : "center"}}>
                            <h1> Belonging, </h1>
                            <h2> &nbsp;feel like you belong</h2>
                        </div>
                        <p style={{ textAlign: 'justify', lineHeight: '25px' }}>
                            Feel deeply connected and valued by those around you.
                            Each member&apos;s presence and contributions foster emotional
                            security and acceptance, creating a foundation of love and support.
                        </p>
                        <p>
                            Nurture confidence and well-being, knowing that you are always
                            part of a team that stands together through life&apos;s ups and downs.
                        </p>
                    </div>
                </div>
            </section>

            <br />
            <hr id="hr2" className="hr-scrollable" />

            <section>
                <div className="section3 home-container">
                    <div className="text section3">
                        <div style={{display : "flex", wrap : "no-wrap", alignItems : "center"}}>
                            <h1> Connection, </h1>
                            <h2> &nbsp;a connected family is a happy one</h2>
                        </div>
                        <p style={{ textAlign: 'justify', lineHeight: '25px' }}>
                            At FamilyBlog we believe that no matter how far you are from your family,
                            harvesting deep relationships and sharing your adventure should be accessible,
                            fun, convenient, and bring you love.
                            <br /><br />
                            Write private blogs that only you and your family will be able to see, edit, and comment.
                        </p>
                    </div>
                    <div className="image section3">
                        <img src="/images/FamillyDALLE.png" alt="image" id="imageSection3" />
                    </div>
                </div>
            </section>

            <br />
            <hr id="hr3" className="hr-scrollable" />

            <footer>
                <div className="footer home-container">
                    <p>
                        Copyright - All Rights Reserved - HappyFamily
                    </p>
                </div>
            </footer>

            <br />
            <br />
            <br />
            <br />
            <br />

        </div>
    );
};

export default Home;
