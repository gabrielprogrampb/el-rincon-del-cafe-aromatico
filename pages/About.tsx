
import React from 'react';

const About: React.FC = () => {
    return (
        <div className="bg-cream animate-fadeIn">
            <div className="container mx-auto px-6 py-20">
                <div className="text-center">
                    <h1 className="text-5xl font-serif font-bold text-coffee-dark mb-4">Nuestra Pasión, Tu Café</h1>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                        Más que una cafetería, somos un punto de encuentro para amantes del buen café.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-12 my-20 items-center">
                    <div className="order-2 md:order-1">
                        <h2 className="text-3xl font-serif font-bold text-coffee-dark mb-4">Nuestra Misión</h2>
                        <p className="text-gray-700 mb-4">
                            Nuestra misión es simple: ofrecer una experiencia de café excepcional. Desde la selección de granos de origen único hasta el tueste artesanal en nuestras instalaciones, cada paso está diseñado para resaltar los sabores y aromas únicos de cada región.
                        </p>
                        <p className="text-gray-700">
                            Creemos en la sostenibilidad, el comercio justo y en construir relaciones duraderas con los productores que comparten nuestra pasión por la calidad.
                        </p>
                    </div>
                    <div className="order-1 md:order-2 overflow-hidden rounded-lg shadow-lg">
                        <img src="https://picsum.photos/seed/about1/600/400" alt="Barista preparing coffee" className="rounded-lg transform hover:scale-105 transition-transform duration-500 ease-in-out"/>
                    </div>
                </div>

                <div className="text-center my-20">
                    <h2 className="text-4xl font-serif font-bold text-coffee-dark mb-10">Conoce al Equipo</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg rounded-lg p-4">
                            <img src="https://picsum.photos/seed/team1/300/300" alt="Team member" className="w-48 h-48 rounded-full mx-auto mb-4 shadow-md"/>
                            <h3 className="text-xl font-bold text-coffee-dark">Elena Torres</h3>
                            <p className="text-coffee-secondary">Fundadora y Maestra Tostadora</p>
                        </div>
                         <div className="text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg rounded-lg p-4">
                            <img src="https://picsum.photos/seed/team2/300/300" alt="Team member" className="w-48 h-48 rounded-full mx-auto mb-4 shadow-md"/>
                            <h3 className="text-xl font-bold text-coffee-dark">Marco Vega</h3>
                            <p className="text-coffee-secondary">Jefe de Baristas</p>
                        </div>
                         <div className="text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-lg rounded-lg p-4">
                            <img src="https://picsum.photos/seed/team3/300/300" alt="Team member" className="w-48 h-48 rounded-full mx-auto mb-4 shadow-md"/>
                            <h3 className="text-xl font-bold text-coffee-dark">Lucía Reyes</h3>
                            <p className="text-coffee-secondary">Gerente de Tienda</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
