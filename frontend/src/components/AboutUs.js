import React from 'react';
import '../Css/AboutUs.css'
import imageBg from '../img/pets-aboutus-bg.jpg'
import jhael from '../img/members/jhael.png'
import gaston from '../img/members/gaston.png'
import sebastian from '../img/members/sebastian.png'
import emanuel from '../img/members/emanuel.png'
import camila from '../img/members/camila.png'

const AboutUs = () => {
    return (
        <div className={'container-aboutUs'}>

            <img className={'w-100-bg'} src={imageBg}/>
            <h1>ABOUT US</h1>
            <div className="about-us">

                <h2 className={'sub-tittle'}>OUR MISSION</h2>
                <p>We assume our commitment to our pet owners, providing them with solutions to their needs and well-being through innovative, reliable and guaranteed products.</p>

            </div>
            <div className="about-us members">
                <h2>MEMBERS</h2>
                <div className="team">
                    <div>
                        <img src={gaston} alt={'img member'}/>
                        <p>Gaston Gutierrez</p>
                    </div>
                    <div>
                        <img src={jhael} alt={'img member'}/>
                        <p>Jhael Arce</p>
                    </div>
                    <div>
                        <img src={sebastian} alt={'img member'}/>
                        <p>Sebastian Barra</p>
                    </div>
                    <div>
                        <img src={camila} alt={'img member'}/>
                        <p>Camila Bustos</p>
                    </div>
                    <div>
                        <img src={emanuel} alt={'img member'}/>
                        <p>Emanuel Galindo</p>
                    </div>
                </div>
            </div>

            <p className={'version'}>My Petshop Version 3.0</p>

        </div>
    );
};

export default AboutUs;