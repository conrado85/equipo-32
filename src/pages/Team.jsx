import React from "react";

function Team() {

    const teamMembers = [
        {
          name: "Fernando Gil",
          role: "Backend Developer",
          image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
        },
        {
          name: "Sebastian Lemus",
          role: "Backend Developer",
          image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
        },
        {
          name: "Franco Maidana",
          role: "Backend Developer",
          image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
        },
        {
          name: "Elideicer San Martin",
          role: "UX/UI Designer",
          image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
        },
        {
          name: "Conrado Gonzalez",
          role: "Frontend Developer",
          image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
        },
        {
          name: "Álvaro Gómez",
          role: "Frontend Developer",
          image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
        },
        {
          name: "Claudia Sanchez",
          role: "QA Tester",
          image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
        },
        {
          name: "William Humberto",
          role: "Frontend Developer",
          image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
        },
      ];

  return (

    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
              No country <span className="text-blue-600"> Equipo 32</span>
            </h1>
            <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mb-8"></div>
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
              Somos un grupo dinámico de personas apasionadas por lo que hacemos
              y dedicadas a ofrecer los mejores resultados a nuestros clientes.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div class="bg-white py-24 sm:py-32">
          <div class="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
            <div class="max-w-xl">
              <h2 class="text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl">
                Conosca nuestro equipo
              </h2>
              <p class="mt-6 text-lg/8 text-gray-600">
               Transformamos la atención médica con cada clic.
              </p>
            </div>
            <ul
              role="list"
              class="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
            >
      
              {teamMembers.map((member, index) => (
                <li key={index}>
                  <div class="flex items-center gap-x-6">
                    <img
                      src={member.image}
                      alt=""
                      class="size-16 rounded-full outline-1 -outline-offset-1 outline-black/5"
                    />
                    <div>
                      <h3 class="text-base/7 font-semibold tracking-tight text-gray-900">
                        {member.name}
                      </h3>
                      <p class="text-sm/6 font-semibold text-indigo-600">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
                    
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Team;
