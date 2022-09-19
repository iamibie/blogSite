import React from 'react'


const Footer = () => {
   return <>
   <footer>
       <div id="footer">
                <div className="social-media">
                    <a href='https://github.com/iamibie'><img src="/img/github.png" alt="Github"/></a>
                    <a href='https://www.linkedin.com/in/ibrahimmahamane/'><img src="/img/linkedin.png" alt="Linkedin"/></a>
                   <a href=''><img src="/img/twitter.png" alt="Twitter"/></a>
                </div>
            <hr width="300px" style={{border:" solid #cf5c36ff"}}/>
                <div id="ph-em" >
                    <a href='mailto:iamahamane@gmail.com'><p>iamahamane@gmail.com</p></a>
                </div>
        </div>
   </footer>
   </>
}

export default Footer
