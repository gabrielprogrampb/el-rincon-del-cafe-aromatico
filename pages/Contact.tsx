
import React from 'react';

const Contact: React.FC = () => {
    return (
        <div className="container mx-auto px-6 py-20 animate-fadeIn">
            <div className="text-center">
                <h1 className="text-5xl font-serif font-bold text-coffee-dark mb-4">Contáctanos</h1>
                <p className="text-xl text-gray-700">Nos encantaría saber de ti. Pasa a saludar o envíanos un mensaje.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 mt-16">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-coffee-dark mb-6">Envíanos un mensaje</h2>
                    <form onSubmit={(e) => { e.preventDefault(); alert('Mensaje enviado (simulación)'); }}>
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                                <input 
                                    type="text" 
                                    id="name"
                                    name="name"
                                    placeholder="Tu nombre completo" 
                                    className="w-full p-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coffee-primary transition-all duration-300 text-coffee-dark placeholder-gray-500 focus:scale-[1.02]" 
                                    required 
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                                <input 
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="tu@correo.com" 
                                    className="w-full p-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coffee-primary transition-all duration-300 text-coffee-dark placeholder-gray-500 focus:scale-[1.02]" 
                                    required 
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                                <textarea 
                                    id="message"
                                    name="message"
                                    placeholder="Escribe tu mensaje aquí..." 
                                    rows={5} 
                                    className="w-full p-3 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-coffee-primary transition-all duration-300 text-coffee-dark placeholder-gray-500 focus:scale-[1.02]" 
                                    required
                                ></textarea>
                            </div>
                            <div>
                                <button type="submit" className="w-full bg-coffee-primary text-white font-bold py-3 px-6 rounded-md hover:bg-coffee-secondary transition-all duration-300 transform hover:scale-105 active:scale-95">
                                    Enviar Mensaje
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md">
                     <h2 className="text-3xl font-bold text-coffee-dark mb-6">Información</h2>
                     <div className="space-y-4">
                        <p><strong>Dirección:</strong> 123 Calle del Café, Ciudad Aroma</p>
                        <p><strong>Teléfono:</strong> (123) 456-7890</p>
                        <p><strong>Email:</strong> contacto@caferincon.com</p>
                        <p><strong>Horario:</strong> Lunes a Sábado: 7am - 7pm</p>
                     </div>
                     <div className="mt-6 h-64 bg-gray-300 rounded-md overflow-hidden">
                        <img src="https://picsum.photos/seed/map/600/400" alt="Map location" className="w-full h-full object-cover rounded-md transform hover:scale-105 transition-transform duration-500 ease-in-out"/>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
