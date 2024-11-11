import React from 'react';
import equipo1 from './images/Farnum.jpeg';
import equipo2 from './images/Tania.jpeg';
import equipo3 from './images/Monica.jpeg';
import equipo4 from './images/Israel.jpeg';
import equipo5 from './images/Jose.jpeg';
import equipo6 from './images/Sosimo.jpeg';
import equipo7 from './images/Lourdes.jpeg';
import equipo8 from './images/Sandra.jpeg';
import { FaEnvelope, FaPhone, FaOrcid } from 'react-icons/fa';

const Nosotros = () => {
  return (
    <div className="bg-gradient-to-r from-[#002855] to-[#00A1E0] p-6 md:p-12 text-[#002855]">
      <h2 className="text-4xl font-bold mb-8 text-center text-white">Sobre Nosotros</h2>
      <p className="text-xl mb-12 text-center max-w-3xl mx-auto text-white">
        Bienvenidos a nuestra organización. Somos un equipo comprometido con la investigación y la innovación.
      </p>
      
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
        <div className="bg-[#002855] text-white p-6 md:p-8 rounded-lg shadow-lg hover:shadow-2xl hover:bg-[#004080] transition duration-300 transform hover:scale-105">
          <h3 className="text-2xl font-semibold mb-4">Nuestra Misión</h3>
          <p>Brindar soluciones innovadoras y accesibles a través de la investigación.</p>
        </div>
        <div className="bg-[#002855] text-white p-6 md:p-8 rounded-lg shadow-lg hover:shadow-2xl hover:bg-[#004080] transition duration-300 transform hover:scale-105">
          <h3 className="text-2xl font-semibold mb-4">Nuestra Visión</h3>
          <p>Ser líderes en investigación y desarrollo en nuestra área de especialización.</p>
        </div>
      </section>

      <section className="text-center">
        <h3 className="text-3xl font-bold mb-8 text-white">Conoce a Nuestro Equipo</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
          {[{ image: equipo1, name: "Dr. Francisco Farnum", title: "Investigador Principal", email: "ffarnum@redipai.org", phone: "+507 6675-1782", orcid: "https://orcid.org/0000-0002-5879-2296" },
            { image: equipo2, name: "Lcda. Tania Kennedy", title: "Gerente Administrativa", email: "administracion@portaldecartelescientificos.org", phone: "+507 6645-7685", orcid: "https://orcid.org/0009-0009-8858-0954" },
            { image: equipo3, name: "Magister Mónica Contreras", title: "Gerente Académica", email: "gerenteacademico@portaldecartelescientificos.org", phone: "+507 6773-4854", orcid: "https://orcid.org/0000-0003-0972-6951" },
            { image: equipo4, name: "Dev. Israel Samuels", title: "Desarrollador Full Stack", email: "soporte@portaldecartelescientificos.org", phone: "+507 6549-8362", orcid: "https://orcid.org/0009-0007-1212-718X" },
            { image: equipo5, name: "Ing. José Murillo", title: "Analista de Sistema y Seguridad Informática", email: "jose.murillot@up.ac.pa", phone: "+507 6320-6113", orcid: "https://orcid.org/0009-0007-1212-718X" },
            { image: equipo6, name: "Dr. Sósimo Poma", title: "Evaluador Académico", email: "evaluadoracademico@portaldecartelescientificos.org", phone: "+51 980-981-906", orcid: "https://orcid.org/0000-0002-5999-5212" },
            { image: equipo7, name: "Dra. Lourdes Céspedes", title: "Evaluadora Académica", email: "evaluadoracademico@portaldecartelescientificos.org", phone: "+51 948-477-669", orcid: "https://orcid.org/0000-0002-4358-8575" },
            { image: equipo8, name: "Dra. Sandra Bedoya Marulanda", title: "Alianza Estratégica Universitaria", email: "aiu.alianzauniversitaria@gmail.com", phone: "+57 3168316782", orcid: "0009-0005-7307-8233"}
          ].map(member => (
            <div key={member.name} className="bg-[#002855] text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 flex flex-col items-center sm:flex-row sm:items-start">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full mb-4 sm:mb-0 sm:mr-6 transform hover:scale-110 transition-transform duration-300" 
              />
              <div className="text-center sm:text-left">
                <h4 className="text-xl font-bold mb-2">{member.name}</h4>
                <p className="text-sm">{member.title}</p>
                <div className="mt-2 text-sm flex items-center">
                  <FaEnvelope className="mr-2" /> {member.email}
                </div>
                <div className="mt-1 text-sm flex items-center">
                  <FaPhone className="mr-2" /> {member.phone}
                </div>
                <a href={member.orcid} className="hover:underline mt-1 text-[#4A90E2] transition-colors duration-300 hover:text-blue-300 flex items-center" target="_blank" rel="noopener noreferrer">
                  <FaOrcid className="mr-2" /> ORCID
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Nosotros;
