/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}',
    './app/components/Common/Footer/index.js',
    './app/containers/Newsletter/index.js',
    './app/components/Store/Tags/Input/index.tsx',
    './app/components/Layout/Header/index.tsx',
    './app/components/Layout/Header/MobileMenu/index.tsx',
    './app/components/HomePageSections/Banners/index.tsx',
    './app/containers/Homepage/index.js',
    './app/components/HomePageSections/Achievement/index.tsx',
    './app/components/HomePageSections/PopularCollections/index.tsx',
    './app/components/List/CollectionList/index.tsx',
    './app/components/HomePageSections/RestockedProducts/index.tsx',
    './app/components/HomePageSections/Trending/index.tsx',
    './app/components/HomePageSections/Marquee/index.tsx',
    './app/components/HomePageSections/Reviews/index.tsx',
    './app/components/List/ProductList/index.jsx',
    './app/components/InstaCard/index.tsx',
    './app/containers/Application/index.js',
    './app/containers/Login/index.js',
    './app/containers/ProductsShop/index.js',
    './app/components/Common/ScrollTranslate/index.tsx',
    './app/components/Common/ShopFilters/index.tsx',
    './app/components/Store/ProductFilter/index.js',
    './app/components/Common/Page404/index.js',
    './app/containers/ProductPage/index.js',
    './app/containers/CategoryShop/index.js',
    './app/containers/Signup/index.js',
    './app/components/Manager/UserList/index.js',
    './app/components/Manager/AdminOrderAddress/index.js',
    './app/components/Manager/AccountMenu/index.js',
    './app/containers/Login/index.js',
    './app/components/HomePageSections/Marquee/index.tsx',
    './app/components/HomePageSections/ReviewNew/ReviewSection.tsx',
    './app/components/HomePageSections/ReviewNew/ReviewCard/index.tsx',
    './app/components/HomePageSections/Ingredients/index.tsx',
    './app/components/HomePageSections/Ingredients/VitaminC/index.tsx',
    './app/components/HomePageSections/Ingredients/VitaminC/card.tsx',
    './app/components/HomePageSections/Ingredients/FacialWash/index.tsx',
    './app/components/HomePageSections/Ingredients/FacialWash/card.tsx',
    './app/components/HomePageSections/Ingredients/FaceToner/index.tsx',
    './app/components/HomePageSections/Ingredients/FaceToner/card.tsx',
    './app/components/HomePageSections/Ingredients/BodySoap/index.tsx',

    './app/components/HomePageSections/NewIngredients/index.tsx',
    './app/components/HomePageSections/NewIngredients/VitaminC/index.tsx',
    './app/components/HomePageSections/NewIngredients/FacialWash/index.tsx',
    './app/components/HomePageSections/NewIngredients/FaceToner/index.tsx',
    './app/components/HomePageSections/NewIngredients/BodySoap/index.tsx',

    './app/components/Store/Others/RowCarousel/index.tsx',
    './app/components/Manager/OrderMeta/index.js',
    './app/components/Store/ProductReviews/index.js',
    './app/containers/ProductPage/index.js',

    './app/containers/FAQ/index.js',

    './app/containers/Booking/List.js',
    './app/containers/Booking/Edit.js',
    './app/containers/Booking/index.js',
    './app/containers/PaymentGateway/index.js',
    './app/containers/AdminDashboard/index.js',

    './app/containers/Navigation/index.js',

    './app/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      keyframes: {
        slide: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-765px)" } },
      },
      animation: {
        slide: "slide 10s linear infinite",
        "slide-slow": "slide 20s linear infinite",
        marquee: "marquee 30s linear infinite",
      },
      screens: {
        'xss': { 'min': '425px', 'max': '453px' },
        'xsss': { 'min': '475px', 'max': '765px' },
        'ip': { 'min': '425px', 'max': '765px' }
      },
      colors: {
        body_background: "#fff",
        background_black: "#242424",
        background_light_grey: "#f4f4f4",
        signature: "#da3e8e",
        signaturee: "#da3e8e",
        primary: "#f8effc",
        primaryy: "#f8effc",
        other: "#ff3860",
        t_beauty: "#F8F0DA",
        text_color: "black",
        button_primary: "lightblue",
        button_secondary: "#fff",
        button_primary_hover: "#646cff",
        button_secondary_hover: "black",
      },
      fontFamily: {
        serif: ["serif"],
        spectral: ["Spectral"],
        youngSerif: ["Young Serif"],
        poppins: ["Poppins"],
        italiano: ["Italianno", "cursive"],
      },
      fontSize: { p: "2em", h1: "2em", h2: "1em", a: "1em", inherit: "inherit" },
      fontWeight: { big: 900, small: 550 },
      borderRadius: { big: "50%", small: "5px", medium: "10px" },
      lineHeight: { tight_custom: "1.25" },
      padding: { normal: ".5em", big: "0px" },
      cursor: { default: "pointer" },
      borderWidth: { black_small: "1px", black_medium: "2.5px", black_big: "5px", light_grey: "1px" },
      borderColor: { black: "black", light_grey: "rgb(205 205 205)" },
      spacing: { extra_small_em: "0.5em", small_em: "1em", medium_em: "1.5em", medium_second_em: "1.75em" },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function ({ addUtilities }) {
      addUtilities({
        '.bg-bubble': {
          '@apply absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 transition-transform duration-700': {},
          'filter': 'blur(40px)',
          'background': 'rgb(218, 62, 142)',
          //'background-image': 'linear-gradient(to bottom right, rgba(96,165,250,0.1), rgba(244,114,182,0.1))',
          '&:hover': {
            'transform': 'scale(1.5)',
          },
        },
        '.bg-bubble-alt': {
          '@apply absolute bottom-0 left-0 w-24 h-24 rounded-full -ml-12 -mb-12 transition-transform duration-700': {},
          'filter': 'blur(40px)',
          'background': 'rgb(218, 62, 142)',
          //'background-image': 'linear-gradient(to top right, rgba(244,114,182,0.1), rgba(96,165,250,0.1))',
          '&:hover': {
            'transform': 'scale(1.5)',
          },
        },
        '.bg-other': {
          'background': '#ff3860',
          'line-height': '31.2px',
          'font-weight': '400'
        },
        '.custom-overlay': {
          '@apply absolute md:relative bottom-0 md:top-0 left-0 w-full md:w-[50%] h-fit z-10 pd-default pb-[1em] sm:pb-0': {}
        },
        '.overlay-full': {
          '@apply absolute flex left-0 top-0 w-full h-full z-10 sm:pb-0': {}
        },
        '.product-width-controller': {
          'width': '150px',
          '@screen ip': {
            'width': '158px'
          },
          '@screen lg': {
            'width': '296px'
          }
        },
        '.margin-top-compact': {
          'margin-top': '10em',
          '@screen lg': {
            'margin-top': '15em'
          }
        },
        '.bg-80-important': {
          'background-size': '80% !important'
        },
        '.bg-60-important': {
          'background-size': '60% !important'
        },
        '.bg-contain-important': {
          'background-size': 'contain !important'
        },
        '.bg-cover-important': {
          'background-size': 'cover !important'
        },
        '.bg-size-initial-important': {
          'background-size': 'initial !important'
        },
        '.bg-bottom-important': {
          'background-position': 'bottom !important'
        },
        '.bg-center-important': {
          'background-position': 'center !important'
        },
        '.bg-top-important': {
          'background-position': 'top !important'
        },
        '.bg-initial-important': {
          'background-position': 'initial !important'
        },
        '.text-sub-align-center-left': {
          'text-align': 'center',
          'color': 'white',
          'width': '90%',
          '@screen md': {
            'text-align': 'left',
            'width': '100%'
          }
        },
        '.text-sub-align-center-left-another': {
          'text-align': 'center',
          'color': 'white',
          'width': '90%',
          '@screen md': {
            'width': '100%'
          }
        },
        '.inherit-color': {
          'color': 'inherit'
        },
        '.heading-inherit-text': {
          'font-size': 'inherit',
          'font-weight': 'inherit',
          'color': 'inherit'
        },
        '.border-bottom-one': {
          'border-bottom': '1px solid'
        },
        '.border-top-one': {
          'border-top': '1px solid'
        },
        '.heading-text': {
          'fontFamily': 'Spectral',
          'text-align': 'center',
          'line-height': '40px',
          '@apply text-[20px] font-extrabold': {},
          '@screen xss': { '@apply text-[24px]': {} },
          '@screen xsss': { '@apply text-[24px]': {} },
          '@screen md': { '@apply text-[35px]': {} },
          '@screen lg': { '@apply text-5xl': {} },
        },
        '.text-signature': {
          'font-size': 'inherit',
          'font-weight': 'inherit'
        },
        '.subHead-text': {
          '@apply font-normal text-[13px] font-[Poppins]': {},
          '@screen md': { '@apply text-[22px]': {} },
          '@screen lg': { '@apply text-[24px]': {} },
        },
        ".a-no-decoration": { "text-decoration": "none" },
        ".bg-linear": { background: "linear-gradient(to bottom, #da3e8e 0%, #f27ca5 100%)" },
        ".pd-default": { 'padding-left': "var(--pdl)", 'padding-right': "var(--pdr)" },
        ".pd-carousel": { 'padding-left': "var(--pdl)", 'padding-right': 0 },
      });
    },
  ],
}