
import {
    FooterCopyright,
    FooterIcon,
    FooterLink,
    FooterLinkGroup,
    FooterTitle,
  } from "flowbite-react";
  import {  BsGithub, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";


 
  
  const Footers  = () =>  {
    
    return (
      <div  className="bg-black text-white lg:pt-[100px] pb-[100px] p-10 rounded-none mt-[100px] lg:mt-[200px]" >
        <div className="w-full">
          <div className="grid  w-full justify-between lg:px-10 sm:flex sm:justify-between md:flex md:grid-cols-1 gap-y-10 pb-10">
            <div>
              <div className="py-2 mb-5 font-bold text-[18px] lg:text-[24px]"><h1>Alquila un Auto</h1></div>
                
               
            </div>
            <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6 ">
              <div>
                <FooterTitle title="Sobre Nosotros" className="text-justify" />
                <FooterLinkGroup col>
                  <FooterLink href="#">Alquila un Auto</FooterLink>
                  <FooterLink href="#">Alquiler de Autos</FooterLink>
                </FooterLinkGroup>
              </div>
              <div>
                <FooterTitle title="Síguenos" className="text-justify" />
                <FooterLinkGroup col>
                  <FooterLink href="https://github.com/ZlmDnl7">Github</FooterLink>
                  <FooterLink href="#">Discord</FooterLink>
                </FooterLinkGroup>
              </div>
              <div>
                <FooterTitle title="Legal" className="text-justify" />
                <FooterLinkGroup col>
                  <FooterLink href="#">Política de Privacidad</FooterLink>
                  <FooterLink href="#">Términos y Condiciones</FooterLink>
                </FooterLinkGroup>
              </div>
            </div>
          </div>
          <hr className="pt-10 lg:m-10 lg:px-10" />
          <div className="w-full sm:flex sm:items-center sm:justify-between lg:px-10 ">
            <FooterCopyright href="#" by="Alquila un Auto" year={2024} />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                              <FooterIcon href="#" icon={BsLinkedin} />
              <FooterIcon href="https://github.com/ZlmDnl7" icon={BsGithub} />
              <FooterIcon href="#" icon={BsInstagram} />
              <FooterIcon href="#" icon={BsTwitter} />
             
             
            </div>
          </div>
        </div>
      </div>
    );
  }
  

  export default Footers