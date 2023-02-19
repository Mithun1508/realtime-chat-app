module.exports = {
    mode: 'jit',
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                scheme: {
                    primary: "#F4ABC4",
                    secondary: "#595B83",
                    tertiary: "#333456",
                    dark: "#0D0D0D",
                    light: "#FDFDFD"
                }
            },
        },
    },
    plugins: [],
}