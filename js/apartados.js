// Funcion para escribir "preguntas frecuentes"
function pf() {
    str = ""
    str += `<main class="preguntas_youknow">
<h1>Preguntas Frecuentes</h1>

<div class="preguntass">
<h3>¿Cuáles son los métodos de pago aceptados?</h2>
<p>Aceptamos tarjetas de crédito y débito (Visa, MasterCard, American Express) y también PayPal como formas de pago.</p>
<br>
<h3>¿Cómo puedo realizar un pedido?</h2>
<p>Para realizar un pedido, simplemente navegue por nuestra tienda en línea, seleccione los productos que desea comprar y siga los pasos del proceso de pago.</p>
<br>
<h3>¿Cuánto tiempo tarda en llegar mi pedido?</h2>
<p>El tiempo de entrega puede variar según la ubicación. Generalmente, los pedidos se entregan en un plazo de 5 a 7 días hábiles después de confirmado el pago.</p>
</div>
</main>`

    $("#contenedor").html(str);
}

// Funcion para escribir "acerca de nosotros"
function ac() {
    str = ""
    str += ` <main class="about_us">

    <h1>Acerca de Nosotros</h1>

    <div class="about_uss">

        <p>Bienvenido a Hansen Music, tu destino definitivo para la mejor selección de instrumentos musicales.
            Nos enorgullece ser una tienda que combina la pasión por la música con el compromiso de brindar a
            nuestros clientes productos de alta calidad y un servicio excepcional.</p>

        <br>
        <p>En Hansen, entendemos que la música es una parte fundamental de la vida. Ya seas un músico
            profesional o un aficionado apasionado, estamos aquí para satisfacer todas tus necesidades
            musicales. Nuestro extenso catálogo abarca desde guitarras y bajos hasta teclados, baterías y
            equipos de audio de las mejores marcas del mercado.</p>
        <br>
        <p>Lo que nos distingue en Hansen es nuestro equipo apasionado de expertos en música. Cada miembro de
            nuestro personal comparte el amor por la música y tiene el conocimiento necesario para asesorarte en
            la elección del instrumento perfecto para ti. Estamos aquí para responder a tus preguntas, ofrecerte
            recomendaciones personalizadas y garantizar que encuentres el instrumento que se adapte a tus
            necesidades y estilo.</p>
        <br>
        <p>Además de ofrecer productos de alta calidad, nos esforzamos por proporcionar una experiencia de
            compra en línea sin problemas. Desde el proceso de selección y compra hasta la entrega de tu
            instrumento, trabajamos arduamente para garantizar tu satisfacción en cada paso del camino.</p>
        <br>


        <p>Gracias por elegir Hansen Music. Estamos emocionados de ser parte de tu viaje musical.</p>

    </div>
</main>`
    $("#contenedor").html(str);
}

// Funcion para escribir "contacto"
function ct() {
    str = ""
    str += `<main class="about_us">

    <div class="contacto_contactado">

        <h1>Contacto</h1>
        <br>
        <p>¡Nos encantaría escuchar de ti! Puedes ponerte en contacto con nosotros a través de los siguientes
            medios:</p>


        <div class="warap">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/240px-WhatsApp.svg.png"
                alt="Logo de WhatsApp" width="30" height="30">
            <span>Número de WhatsApp: +54 9 11 6196-6881</span>
        </div>


        <div class="ige">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/240px-Instagram_icon.png"
                alt="Logo de Instagram" width="30" height="30">
            <a href="https://www.instagram.com/tu_cuenta_de_instagram" target="_blank">Síguenos en Instagram</a>
        </div>

    </div>
</main>`
    $("#contenedor").html(str);
}