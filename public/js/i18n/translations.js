/**
 * Internationalization (i18n) Translations
 * Multi-language dictionary for Nomada Tickets
 *
 * Languages supported:
 * - en: English (default)
 * - es: Spanish
 * - pt-BR: Portuguese (Brazil)
 */

export const translations = {
  // ============================================
  // ENGLISH
  // ============================================
  en: {
    header: {
      byline: 'by Nómada',
      language: 'Language',
      languageEN: 'English',
      languageES: 'Español',
      languagePTBR: 'Português'
    },

    home: {
      heroTitle: 'Providing Premium',
      heroTitleHighlight: 'Nightlife',
      heroTitleEnd: 'Experiences',
      heroSubtitle: 'Join us for unforgettable nights with exclusive access to Toronto\'s hottest venues, free shots, drink deals, and professional photography.',
      buyTicketBtn: 'Buy your ticket',
      checkTicketsBtn: 'Check your tickets',
      featuresTitle: 'What\'s Included',
      feature1Title: 'Free Shots',
      feature1Desc: 'Complimentary shots at each venue we visit throughout the night.',
      feature2Title: 'Drink Deals',
      feature2Desc: 'Exclusive drink specials and discounts at all partner venues.',
      feature3Title: 'Photographer',
      feature3Desc: 'Professional photographer capturing your best moments all night.',
      feature4Title: 'Best Night Ever',
      feature4Desc: 'Curated experience with VIP entry and the best party atmosphere.',
      bannerBtn: 'Check out our upcoming events'
    },

    tickets: {
      title: 'Select Your',
      titleHighlight: 'Tickets',
      subtitle: 'Choose the number of tickets you need',
      femaleLabel: 'Female',
      femalePrice: '$1.00 CAD',
      maleLabel: 'Male',
      malePrice: '$2.00 CAD',
      continueBtn: 'Continue',
      errorNoTickets: 'Please select at least one ticket to continue.',
      warningTitle: 'Important Information',
      warningText: 'By continuing, you confirm that you are at least 19 years of age and agree to our terms and conditions. Tickets are non-refundable. Please ensure your selection is correct before proceeding to payment.',
      warningContinueBtn: 'I Understand, Continue',
      womenTicket: 'Women Ticket',
      menTicket: 'Men Ticket',
      of: 'of',
      showAtEntrance: 'Show each QR code at the entrance',
      screenshotTip: 'Tip: Screenshot each QR code',
      checkEmail: '<strong>Check your Email</strong>, your tickets are ready!'
    },

    payment: {
      title: 'Complete Your Purchase',
      backLink: 'Back to ticket selection',
      emailLabel: 'Email Address',
      emailPlaceholder: 'your@email.com',
      emailHelper: 'We\'ll send your tickets to this email',
      orderSummary: 'Order Summary',
      femaleTickets: 'Female Tickets',
      maleTickets: 'Male Tickets',
      subtotal: 'Subtotal',
      processingFee: 'Processing Fee',
      total: 'Total',
      termsText: 'I agree to the',
      termsLink: 'Terms and Conditions',
      termsWarning: 'You must accept the terms and conditions to continue.',
      payBtn: 'Pay Now',
      payingBtn: 'Processing...',
      secureBadge: 'Secure payment powered by Stripe',
      processingTitle: 'Processing Payment',
      processingText: 'Please wait while we confirm your payment...',
      successTitle: 'Payment Successful!',
      successMessage: 'Your tickets have been confirmed. Show this QR code at the entrance.',
      successContinueBtn: 'Back to Home',
      qrCaption: 'Your Ticket QR Code',
      emailToastTitle: 'Your ticket is on its way!',
      emailToastSubtitle: "If you don't see it in 2 minutes, check your {spam} folder and mark it as {notSpam}.",
      emailToastSpam: 'spam/junk',
      emailToastNotSpam: 'Not Spam',
      errorGeneric: 'Something went wrong. Please try again.',
      errorPayment: 'Payment failed. Please check your card details and try again.',
      errorNetwork: 'Network error. Please check your connection and try again.',
      errorTimeout: 'Request timed out. Please try again.'
    },

    footer: {
      copyright: '© 2026 Nómada. All rights reserved.',
      support: 'Need support? Contact us at'
    },

    lookup: {
      modalTitle: 'Find Your Tickets',
      modalSubtitle: 'Enter your details to retrieve your order.',
      emailLabel: 'Email Address',
      emailPlaceholder: 'your@email.com',
      refLabel: 'Order Reference',
      refPlaceholder: 'NMD-XXXX-XXXX',
      refHelper: 'Found in your confirmation email.',
      submitBtn: 'Find My Tickets',
      submittingBtn: 'Searching...',
      backBtn: 'Go to Home',
      errorNotFound: 'No order found. Please check your email and reference code.',
      errorNetwork: 'Network error. Please check your connection and try again.',
      errorGeneric: 'Something went wrong. Please try again.',
      errorPending: 'Your tickets are still being generated. Please try again in a moment.',
      lockoutTitle: 'Too many attempts',
      lockoutMessage: 'Please wait before trying again.',
      lockoutTimerLabel: 'Try again in',
      resultsTitle: 'Your Tickets',
      orderRef: 'Order',
      ticketCounter: '{current} of {total}',
      summaryTitle: 'Order Summary',
      summaryFemale: 'Women tickets',
      summaryMale: 'Men tickets',
      summarySubtotal: 'Subtotal',
      summaryFee: 'Processing fee',
      summaryTotal: 'Total',
      summaryCurrency: 'CAD',
      womenTicket: 'Women Ticket',
      menTicket: 'Men Ticket',
      ticketUsed: 'Already scanned at door',
      resendBtn: '✉ Resend to my email',
      resendSending: 'Sending...',
      resendSuccess: 'Sent! Check your inbox.',
      resendErrorCap: 'Daily resend limit reached. Try again tomorrow.',
      resendErrorFail: 'Could not send email. Please try again later.',
    }
  },

  // ============================================
  // SPANISH
  // ============================================
  es: {
    header: {
      byline: 'por Nómada',
      language: 'Idioma',
      languageEN: 'English',
      languageES: 'Español',
      languagePTBR: 'Português'
    },

    home: {
      heroTitle: 'Ofreciendo Experiencias',
      heroTitleHighlight: 'Nocturnas',
      heroTitleEnd: 'Premium',
      heroSubtitle: 'Únete a nosotros para noches inolvidables con acceso exclusivo a los mejores lugares de Toronto, shots gratis, ofertas de bebidas y fotografía profesional.',
      buyTicketBtn: 'Compra tu entrada',
      checkTicketsBtn: 'Consultar mis entradas',
      featuresTitle: 'Qué Incluye',
      feature1Title: 'Shots Gratis',
      feature1Desc: 'Shots de cortesía en cada lugar que visitemos durante la noche.',
      feature2Title: 'Ofertas de Bebidas',
      feature2Desc: 'Especiales exclusivos y descuentos en todos los lugares asociados.',
      feature3Title: 'Fotógrafo',
      feature3Desc: 'Fotógrafo profesional capturando tus mejores momentos toda la noche.',
      feature4Title: 'Mejor Noche',
      feature4Desc: 'Experiencia curada con entrada VIP y el mejor ambiente de fiesta.',
      bannerBtn: 'Mira nuestros próximos eventos'
    },

    tickets: {
      title: 'Selecciona Tus',
      titleHighlight: 'Entradas',
      subtitle: 'Elige la cantidad de entradas que necesitas',
      femaleLabel: 'Mujer',
      femalePrice: '$1.00 CAD',
      maleLabel: 'Hombre',
      malePrice: '$2.00 CAD',
      continueBtn: 'Continuar',
      errorNoTickets: 'Por favor selecciona al menos una entrada para continuar.',
      warningTitle: 'Información Importante',
      warningText: 'Al continuar, confirmas que tienes al menos 19 años de edad y aceptas nuestros términos y condiciones. Las entradas no son reembolsables. Asegúrate de que tu selección sea correcta antes de proceder al pago.',
      warningContinueBtn: 'Entiendo, Continuar',
      womenTicket: 'Entrada Mujer',
      menTicket: 'Entrada Hombre',
      of: 'de',
      showAtEntrance: 'Muestra cada código QR en la entrada',
      screenshotTip: 'Tip: Toma captura de cada código QR',
      checkEmail: '<strong>Revisa tu Correo</strong>, ¡tus entradas están listas!'
    },

    payment: {
      title: 'Completa tu Compra',
      backLink: 'Volver a selección de entradas',
      emailLabel: 'Correo Electrónico',
      emailPlaceholder: 'tu@correo.com',
      emailHelper: 'Te enviaremos tus entradas a este correo',
      orderSummary: 'Resumen del Pedido',
      femaleTickets: 'Entradas Mujer',
      maleTickets: 'Entradas Hombre',
      subtotal: 'Subtotal',
      processingFee: 'Cargo de Procesamiento',
      total: 'Total',
      termsText: 'Acepto los',
      termsLink: 'Términos y Condiciones',
      termsWarning: 'Debes aceptar los términos y condiciones para continuar.',
      payBtn: 'Pagar Ahora',
      payingBtn: 'Procesando...',
      secureBadge: 'Pago seguro con Stripe',
      processingTitle: 'Procesando Pago',
      processingText: 'Por favor espera mientras confirmamos tu pago...',
      successTitle: '¡Pago Exitoso!',
      successMessage: 'Tus entradas han sido confirmadas. Muestra este código QR en la entrada.',
      successContinueBtn: 'Volver al Inicio',
      qrCaption: 'Tu Código QR de Entrada',
      emailToastTitle: '¡Tu entrada está en camino!',
      emailToastSubtitle: 'Si no lo ves en 2 minutos, revisa tu carpeta de {spam} y márcalo como {notSpam}.',
      emailToastSpam: 'spam/correo no deseado',
      emailToastNotSpam: 'No es Spam',
      errorGeneric: 'Algo salió mal. Por favor intenta de nuevo.',
      errorPayment: 'El pago falló. Por favor verifica los datos de tu tarjeta e intenta de nuevo.',
      errorNetwork: 'Error de red. Por favor verifica tu conexión e intenta de nuevo.',
      errorTimeout: 'La solicitud expiró. Por favor intenta de nuevo.'
    },

    footer: {
      copyright: '© 2026 Nómada. Todos los derechos reservados.',
      support: '¿Necesitas soporte? Contáctanos en'
    },

    lookup: {
      modalTitle: 'Encuentra tus Entradas',
      modalSubtitle: 'Ingresa tus datos para recuperar tu pedido.',
      emailLabel: 'Correo Electrónico',
      emailPlaceholder: 'tu@correo.com',
      refLabel: 'Referencia de Pedido',
      refPlaceholder: 'NMD-XXXX-XXXX',
      refHelper: 'Encuéntralo en tu correo de confirmación.',
      submitBtn: 'Buscar mis Entradas',
      submittingBtn: 'Buscando...',
      backBtn: 'Ir al Inicio',
      errorNotFound: 'No se encontró ningún pedido. Verifica tu correo y referencia.',
      errorNetwork: 'Error de red. Verifica tu conexión e inténtalo de nuevo.',
      errorGeneric: 'Algo salió mal. Por favor inténtalo de nuevo.',
      errorPending: 'Tus entradas aún se están generando. Inténtalo en un momento.',
      lockoutTitle: 'Demasiados intentos',
      lockoutMessage: 'Por favor espera antes de intentarlo de nuevo.',
      lockoutTimerLabel: 'Inténtalo en',
      resultsTitle: 'Tus Entradas',
      orderRef: 'Pedido',
      ticketCounter: '{current} de {total}',
      summaryTitle: 'Resumen del Pedido',
      summaryFemale: 'Entradas mujeres',
      summaryMale: 'Entradas hombres',
      summarySubtotal: 'Subtotal',
      summaryFee: 'Cargo de procesamiento',
      summaryTotal: 'Total',
      summaryCurrency: 'CAD',
      womenTicket: 'Entrada Mujer',
      menTicket: 'Entrada Hombre',
      ticketUsed: 'Ya escaneado en puerta',
      resendBtn: '✉ Reenviar a mi correo',
      resendSending: 'Enviando...',
      resendSuccess: '¡Enviado! Revisa tu bandeja.',
      resendErrorCap: 'Límite diario alcanzado. Inténtalo mañana.',
      resendErrorFail: 'No se pudo enviar. Inténtalo más tarde.',
    }
  },

  // ============================================
  // PORTUGUESE (BRAZIL)
  // ============================================
  'pt-BR': {
    header: {
      byline: 'por Nómada',
      language: 'Idioma',
      languageEN: 'English',
      languageES: 'Español',
      languagePTBR: 'Português'
    },

    home: {
      heroTitle: 'Proporcionando Experiências',
      heroTitleHighlight: 'Noturnas',
      heroTitleEnd: 'Premium',
      heroSubtitle: 'Junte-se a nós para noites inesquecíveis com acesso exclusivo aos melhores locais de Toronto, shots grátis, promoções de bebidas e fotografia profissional.',
      buyTicketBtn: 'Compre seu ingresso',
      checkTicketsBtn: 'Consultar meus ingressos',
      featuresTitle: 'O Que Está Incluído',
      feature1Title: 'Shots Grátis',
      feature1Desc: 'Shots cortesia em cada local que visitamos durante a noite.',
      feature2Title: 'Promoções de Bebidas',
      feature2Desc: 'Especiais exclusivos e descontos em todos os locais parceiros.',
      feature3Title: 'Fotógrafo',
      feature3Desc: 'Fotógrafo profissional capturando seus melhores momentos a noite toda.',
      feature4Title: 'Melhor Noite',
      feature4Desc: 'Experiência curada com entrada VIP e a melhor atmosfera de festa.',
      bannerBtn: 'Confira nossos próximos eventos'
    },

    tickets: {
      title: 'Selecione Seus',
      titleHighlight: 'Ingressos',
      subtitle: 'Escolha a quantidade de ingressos que você precisa',
      femaleLabel: 'Feminino',
      femalePrice: '$1.00 CAD',
      maleLabel: 'Masculino',
      malePrice: '$2.00 CAD',
      continueBtn: 'Continuar',
      errorNoTickets: 'Por favor selecione pelo menos um ingresso para continuar.',
      warningTitle: 'Informação Importante',
      warningText: 'Ao continuar, você confirma que tem pelo menos 19 anos de idade e concorda com nossos termos e condições. Os ingressos não são reembolsáveis. Certifique-se de que sua seleção está correta antes de prosseguir para o pagamento.',
      warningContinueBtn: 'Entendi, Continuar',
      womenTicket: 'Ingresso Feminino',
      menTicket: 'Ingresso Masculino',
      of: 'de',
      showAtEntrance: 'Mostre cada código QR na entrada',
      screenshotTip: 'Dica: Tire print de cada código QR',
      checkEmail: '<strong>Verifique seu E-mail</strong>, seus ingressos estão prontos!'
    },

    payment: {
      title: 'Complete Sua Compra',
      backLink: 'Voltar para seleção de ingressos',
      emailLabel: 'Endereço de E-mail',
      emailPlaceholder: 'seu@email.com',
      emailHelper: 'Enviaremos seus ingressos para este e-mail',
      orderSummary: 'Resumo do Pedido',
      femaleTickets: 'Ingressos Femininos',
      maleTickets: 'Ingressos Masculinos',
      subtotal: 'Subtotal',
      processingFee: 'Taxa de Processamento',
      total: 'Total',
      termsText: 'Eu concordo com os',
      termsLink: 'Termos e Condições',
      termsWarning: 'Você deve aceitar os termos e condições para continuar.',
      payBtn: 'Pagar Agora',
      payingBtn: 'Processando...',
      secureBadge: 'Pagamento seguro com Stripe',
      processingTitle: 'Processando Pagamento',
      processingText: 'Por favor aguarde enquanto confirmamos seu pagamento...',
      successTitle: 'Pagamento Bem-sucedido!',
      successMessage: 'Seus ingressos foram confirmados. Mostre este código QR na entrada.',
      successContinueBtn: 'Voltar ao Início',
      qrCaption: 'Seu Código QR do Ingresso',
      emailToastTitle: 'Seu ingresso está a caminho!',
      emailToastSubtitle: 'Se não aparecer em 2 minutos, verifique sua pasta de {spam} e marque como {notSpam}.',
      emailToastSpam: 'spam/lixo eletrônico',
      emailToastNotSpam: 'Não é Spam',
      errorGeneric: 'Algo deu errado. Por favor tente novamente.',
      errorPayment: 'O pagamento falhou. Por favor verifique os dados do seu cartão e tente novamente.',
      errorNetwork: 'Erro de rede. Por favor verifique sua conexão e tente novamente.',
      errorTimeout: 'A solicitação expirou. Por favor tente novamente.'
    },

    footer: {
      copyright: '© 2026 Nómada. Todos os direitos reservados.',
      support: 'Precisa de suporte? Entre em contato:'
    },

    lookup: {
      modalTitle: 'Encontre seus Ingressos',
      modalSubtitle: 'Insira seus dados para recuperar seu pedido.',
      emailLabel: 'Endereço de E-mail',
      emailPlaceholder: 'seu@email.com',
      refLabel: 'Referência do Pedido',
      refPlaceholder: 'NMD-XXXX-XXXX',
      refHelper: 'Encontre no seu e-mail de confirmação.',
      submitBtn: 'Buscar meus Ingressos',
      submittingBtn: 'Buscando...',
      backBtn: 'Ir ao Início',
      errorNotFound: 'Pedido não encontrado. Verifique seu e-mail e referência.',
      errorNetwork: 'Erro de rede. Verifique sua conexão e tente novamente.',
      errorGeneric: 'Algo deu errado. Por favor tente novamente.',
      errorPending: 'Seus ingressos ainda estão sendo gerados. Tente em um momento.',
      lockoutTitle: 'Muitas tentativas',
      lockoutMessage: 'Por favor aguarde antes de tentar novamente.',
      lockoutTimerLabel: 'Tente novamente em',
      resultsTitle: 'Seus Ingressos',
      orderRef: 'Pedido',
      ticketCounter: '{current} de {total}',
      summaryTitle: 'Resumo do Pedido',
      summaryFemale: 'Ingressos femininos',
      summaryMale: 'Ingressos masculinos',
      summarySubtotal: 'Subtotal',
      summaryFee: 'Taxa de processamento',
      summaryTotal: 'Total',
      summaryCurrency: 'CAD',
      womenTicket: 'Ingresso Feminino',
      menTicket: 'Ingresso Masculino',
      ticketUsed: 'Já escaneado na entrada',
      resendBtn: '✉ Reenviar para meu e-mail',
      resendSending: 'Enviando...',
      resendSuccess: 'Enviado! Verifique sua caixa de entrada.',
      resendErrorCap: 'Limite diário atingido. Tente amanhã.',
      resendErrorFail: 'Não foi possível enviar. Tente mais tarde.',
    }
  }
};

/**
 * Get translation for a given key path
 * @param {string} lang - Language code
 * @param {string} keyPath - Dot-separated key path (e.g., 'home.heroTitle')
 * @returns {string} Translated text or key path if not found
 */
export function t(lang, keyPath) {
  const keys = keyPath.split('.');
  let result = translations[lang];

  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      result = translations.en;
      for (const fallbackKey of keys) {
        if (result && typeof result === 'object' && fallbackKey in result) {
          result = result[fallbackKey];
        } else {
          console.warn(`[i18n] Missing translation: ${keyPath}`);
          return keyPath;
        }
      }
      break;
    }
  }

  return typeof result === 'string' ? result : keyPath;
}

/**
 * Get all translations for a language
 * @param {string} lang - Language code
 * @returns {Object} Translation object
 */
export function getTranslations(lang) {
  return translations[lang] || translations.en;
}