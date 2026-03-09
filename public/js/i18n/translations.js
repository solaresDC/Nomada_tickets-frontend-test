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
    // Header
    header: {
      byline: 'by Nómada',
      language: 'Language',
      languageEN: 'English',
      languageES: 'Español',
      languagePTBR: 'Português'
    },
    
    // Page 1 - Home
    home: {
      heroTitle: 'Providing Premium',
      heroTitleHighlight: 'Nightlife',
      heroTitleEnd: 'Experiences',
      heroSubtitle: 'Join us for unforgettable nights with exclusive access to Toronto\'s hottest venues, free shots, drink deals, and professional photography.',
      buyTicketBtn: 'Buy your ticket',
      eventsBtn: 'Events',
      
      // Features
      featuresTitle: 'What\'s Included',
      feature1Title: 'Free Shots',
      feature1Desc: 'Complimentary shots at each venue we visit throughout the night.',
      feature2Title: 'Drink Deals',
      feature2Desc: 'Exclusive drink specials and discounts at all partner venues.',
      feature3Title: 'Photographer',
      feature3Desc: 'Professional photographer capturing your best moments all night.',
      feature4Title: 'Best Night Ever',
      feature4Desc: 'Curated experience with VIP entry and the best party atmosphere.',
      
      // Banner
      bannerBtn: 'Check out our upcoming events'
    },
    
    // Page 2 - Ticket Selection
    tickets: {
      title: 'Select Your',
      titleHighlight: 'Tickets',
      subtitle: 'Choose the number of tickets you need',
      
      femaleLabel: 'Female',
      femalePrice: '$1.00 CAD',
      maleLabel: 'Male',
      malePrice: '$2.00 CAD',
      
      continueBtn: 'Continue',
      
      // Error
      errorNoTickets: 'Please select at least one ticket to continue.',
      
      // Warning Modal
      warningTitle: 'Important Information',
      warningText: 'By continuing, you confirm that you are at least 19 years of age and agree to our terms and conditions. Tickets are non-refundable. Please ensure your selection is correct before proceeding to payment.',
      warningContinueBtn: 'I Understand, Continue',

      // QR Carousel (Phase 2)
      womenTicket: 'Women Ticket',
      menTicket: 'Men Ticket',
      of: 'of',
      showAtEntrance: 'Show each QR code at the entrance',
      screenshotTip: 'Tip: Screenshot each QR code',
      checkEmail: 'Check your email for a copy of your tickets'   
    },
    
    // Page 3 - Payment
    payment: {
      title: 'Complete Your Purchase',
      backLink: 'Back to ticket selection',
      
      // Email
      emailLabel: 'Email Address',
      emailPlaceholder: 'your@email.com',
      emailHelper: 'We\'ll send your tickets to this email',

      // Order Summary
      orderSummary: 'Order Summary',
      femaleTickets: 'Female Tickets',
      maleTickets: 'Male Tickets',
      subtotal: 'Subtotal',
      processingFee: 'Processing Fee',
      total: 'Total',
      
      // Terms
      termsText: 'I agree to the',
      termsLink: 'Terms and Conditions',
      termsWarning: 'You must accept the terms and conditions to continue.',
      
      // Pay Button
      payBtn: 'Pay Now',
      payingBtn: 'Processing...',
      
      // Secure Badge
      secureBadge: 'Secure payment powered by Stripe',
      
      // Processing Modal
      processingTitle: 'Processing Payment',
      processingText: 'Please wait while we confirm your payment...',
      
      // Success Modal
      successTitle: 'Payment Successful!',
      successMessage: 'Your tickets have been confirmed. Show this QR code at the entrance.',
      successContinueBtn: 'Back to Home',
      qrCaption: 'Your Ticket QR Code',

      // Email Toast
      emailToastTitle: 'Your ticket is on its way!',
      emailToastSubtitle: "If you don't see it in 2 minutes, check your {spam} folder and mark it as {notSpam}.",
      emailToastSpam: 'spam/junk',
      emailToastNotSpam: 'Not Spam',
      
      // Errors
      errorGeneric: 'Something went wrong. Please try again.',
      errorPayment: 'Payment failed. Please check your card details and try again.',
      errorNetwork: 'Network error. Please check your connection and try again.',
      errorTimeout: 'Request timed out. Please try again.'
    },
    
    // Footer
    footer: {
      copyright: '© 2026 Nómada. All rights reserved.'
    }
  },
  
  // ============================================
  // SPANISH
  // ============================================
  es: {
    // Header
    header: {
      byline: 'por Nómada',
      language: 'Idioma',
      languageEN: 'English',
      languageES: 'Español',
      languagePTBR: 'Português'
    },
    
    // Page 1 - Home
    home: {
      heroTitle: 'Ofreciendo Experiencias',
      heroTitleHighlight: 'Nocturnas',
      heroTitleEnd: 'Premium',
      heroSubtitle: 'Únete a nosotros para noches inolvidables con acceso exclusivo a los mejores lugares de Toronto, shots gratis, ofertas de bebidas y fotografía profesional.',
      buyTicketBtn: 'Compra tu entrada',
      eventsBtn: 'Eventos',
      
      // Features
      featuresTitle: 'Qué Incluye',
      feature1Title: 'Shots Gratis',
      feature1Desc: 'Shots de cortesía en cada lugar que visitemos durante la noche.',
      feature2Title: 'Ofertas de Bebidas',
      feature2Desc: 'Especiales exclusivos y descuentos en todos los lugares asociados.',
      feature3Title: 'Fotógrafo',
      feature3Desc: 'Fotógrafo profesional capturando tus mejores momentos toda la noche.',
      feature4Title: 'Mejor Noche',
      feature4Desc: 'Experiencia curada con entrada VIP y el mejor ambiente de fiesta.',
      
      // Banner
      bannerBtn: 'Mira nuestros próximos eventos'
    },
    
    // Page 2 - Ticket Selection
    tickets: {
      title: 'Selecciona Tus',
      titleHighlight: 'Entradas',
      subtitle: 'Elige la cantidad de entradas que necesitas',
      
      femaleLabel: 'Mujer',
      femalePrice: '$1.00 CAD',
      maleLabel: 'Hombre',
      malePrice: '$2.00 CAD',
      
      continueBtn: 'Continuar',
      
      // Error
      errorNoTickets: 'Por favor selecciona al menos una entrada para continuar.',
      
      // Warning Modal
      warningTitle: 'Información Importante',
      warningText: 'Al continuar, confirmas que tienes al menos 19 años de edad y aceptas nuestros términos y condiciones. Las entradas no son reembolsables. Asegúrate de que tu selección sea correcta antes de proceder al pago.',
      warningContinueBtn: 'Entiendo, Continuar',

      // QR Carousel (Phase 2)
      womenTicket: 'Entrada Mujer',
      menTicket: 'Entrada Hombre',
      of: 'de',
      showAtEntrance: 'Muestra cada código QR en la entrada',
      screenshotTip: 'Consejo: Captura cada código QR',
      checkEmail: 'Revisa tu correo para una copia de tus boletos'
    },
    
    // Page 3 - Payment
    payment: {
      title: 'Completa Tu Compra',
      backLink: 'Volver a selección de entradas',

      //Email
      emailLabel: 'Correo Electrónico',
      emailPlaceholder: 'tu@correo.com',
      emailHelper: 'Enviaremos tus boletos a este correo',
      
      // Order Summary
      orderSummary: 'Resumen del Pedido',
      femaleTickets: 'Entradas Mujer',
      maleTickets: 'Entradas Hombre',
      subtotal: 'Subtotal',
      processingFee: 'Tarifa de Procesamiento',
      total: 'Total',
      
      // Terms
      termsText: 'Acepto los',
      termsLink: 'Términos y Condiciones',
      termsWarning: 'Debes aceptar los términos y condiciones para continuar.',
      
      // Pay Button
      payBtn: 'Pagar Ahora',
      payingBtn: 'Procesando...',
      
      // Secure Badge
      secureBadge: 'Pago seguro con Stripe',
      
      // Processing Modal
      processingTitle: 'Procesando Pago',
      processingText: 'Por favor espera mientras confirmamos tu pago...',
      
      // Success Modal
      successTitle: '¡Pago Exitoso!',
      successMessage: 'Tus entradas han sido confirmadas. Muestra este código QR en la entrada.',
      successContinueBtn: 'Volver al Inicio',
      qrCaption: 'Tu Código QR de Entrada',
      
      // Email Toast
      emailToastTitle: '¡Tu entrada está en camino!',
      emailToastSubtitle: 'Si no lo ves en 2 minutos, revisa tu carpeta de {spam} y márcalo como {notSpam}.',
      emailToastSpam: 'spam/correo no deseado',
      emailToastNotSpam: 'No es Spam',

      // Errors
      errorGeneric: 'Algo salió mal. Por favor intenta de nuevo.',
      errorPayment: 'El pago falló. Por favor verifica los datos de tu tarjeta e intenta de nuevo.',
      errorNetwork: 'Error de red. Por favor verifica tu conexión e intenta de nuevo.',
      errorTimeout: 'La solicitud expiró. Por favor intenta de nuevo.'
    },
    
    // Footer
    footer: {
      copyright: '© 2026 Nómada. Todos los derechos reservados.'
    }
  },
  
  // ============================================
  // PORTUGUESE (BRAZIL)
  // ============================================
  'pt-BR': {
    // Header
    header: {
      byline: 'por Nómada',
      language: 'Idioma',
      languageEN: 'English',
      languageES: 'Español',
      languagePTBR: 'Português'
    },
    
    // Page 1 - Home
    home: {
      heroTitle: 'Proporcionando Experiências',
      heroTitleHighlight: 'Noturnas',
      heroTitleEnd: 'Premium',
      heroSubtitle: 'Junte-se a nós para noites inesquecíveis com acesso exclusivo aos melhores locais de Toronto, shots grátis, promoções de bebidas e fotografia profissional.',
      buyTicketBtn: 'Compre seu ingresso',
      eventsBtn: 'Eventos',
      
      // Features
      featuresTitle: 'O Que Está Incluído',
      feature1Title: 'Shots Grátis',
      feature1Desc: 'Shots cortesia em cada local que visitamos durante a noite.',
      feature2Title: 'Promoções de Bebidas',
      feature2Desc: 'Especiais exclusivos e descontos em todos os locais parceiros.',
      feature3Title: 'Fotógrafo',
      feature3Desc: 'Fotógrafo profissional capturando seus melhores momentos a noite toda.',
      feature4Title: 'Melhor Noite',
      feature4Desc: 'Experiência curada com entrada VIP e a melhor atmosfera de festa.',
      
      // Banner
      bannerBtn: 'Confira nossos próximos eventos'
    },
    
    // Page 2 - Ticket Selection
    tickets: {
      title: 'Selecione Seus',
      titleHighlight: 'Ingressos',
      subtitle: 'Escolha a quantidade de ingressos que você precisa',
      
      femaleLabel: 'Feminino',
      femalePrice: '$1.00 CAD',
      maleLabel: 'Masculino',
      malePrice: '$2.00 CAD',
      
      continueBtn: 'Continuar',
      
      // Error
      errorNoTickets: 'Por favor selecione pelo menos um ingresso para continuar.',
      
      // Warning Modal
      warningTitle: 'Informação Importante',
      warningText: 'Ao continuar, você confirma que tem pelo menos 19 anos de idade e concorda com nossos termos e condições. Os ingressos não são reembolsáveis. Certifique-se de que sua seleção está correta antes de prosseguir para o pagamento.',
      warningContinueBtn: 'Entendi, Continuar',

      // QR Carousel (Phase 2)
      womenTicket: 'Ingresso Feminino',
      menTicket: 'Ingresso Masculino',
      of: 'de',
      showAtEntrance: 'Mostre cada código QR na entrada',
      screenshotTip: 'Dica: Tire print de cada código QR',
      checkEmail: 'Verifique seu e-mail para uma cópia dos seus ingressos'
    },
    
    // Page 3 - Payment
    payment: {
      title: 'Complete Sua Compra',
      backLink: 'Voltar para seleção de ingressos',
      
      //Email
      emailLabel: 'Endereço de E-mail',
      emailPlaceholder: 'seu@email.com',
      emailHelper: 'Enviaremos seus ingressos para este e-mail',

      // Order Summary
      orderSummary: 'Resumo do Pedido',
      femaleTickets: 'Ingressos Femininos',
      maleTickets: 'Ingressos Masculinos',
      subtotal: 'Subtotal',
      processingFee: 'Taxa de Processamento',
      total: 'Total',
      
      // Terms
      termsText: 'Eu concordo com os',
      termsLink: 'Termos e Condições',
      termsWarning: 'Você deve aceitar os termos e condições para continuar.',
      
      // Pay Button
      payBtn: 'Pagar Agora',
      payingBtn: 'Processando...',
      
      // Secure Badge
      secureBadge: 'Pagamento seguro com Stripe',
      
      // Processing Modal
      processingTitle: 'Processando Pagamento',
      processingText: 'Por favor aguarde enquanto confirmamos seu pagamento...',
      
      // Success Modal
      successTitle: 'Pagamento Bem-sucedido!',
      successMessage: 'Seus ingressos foram confirmados. Mostre este código QR na entrada.',
      successContinueBtn: 'Voltar ao Início',
      qrCaption: 'Seu Código QR do Ingresso',

      // Email Toast
      emailToastTitle: 'Seu ingresso está a caminho!',
      emailToastSubtitle: 'Se não aparecer em 2 minutos, verifique sua pasta de {spam} e marque como {notSpam}.',
      emailToastSpam: 'spam/lixo eletrônico',
      emailToastNotSpam: 'Não é Spam',
      
      // Errors
      errorGeneric: 'Algo deu errado. Por favor tente novamente.',
      errorPayment: 'O pagamento falhou. Por favor verifique os dados do seu cartão e tente novamente.',
      errorNetwork: 'Erro de rede. Por favor verifique sua conexão e tente novamente.',
      errorTimeout: 'A solicitação expirou. Por favor tente novamente.'
    },
    
    // Footer
    footer: {
      copyright: '© 2026 Nómada. Todos os direitos reservados.'
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
      // Fallback to English
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