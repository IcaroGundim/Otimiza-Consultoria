// eslint-config-next 16 já exporta flat config nativo. O FlatCompat do
// @eslint/eslintrc estoura "Converting circular structure to JSON" aqui.
// core-web-vitals já inclui next e next/typescript.
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextCoreWebVitals,
  {
    // Atualizar material.uniforms.X.value dentro do useFrame é o idioma do
    // react-three-fiber: o loop de render é imperativo e roda a 60fps, então
    // mutação é obrigatória — passar isso por estado re-renderizaria o React
    // a cada frame. A regra react-hooks/immutability (React Compiler) não
    // modela render loop de WebGL e acusa falso positivo aqui.
    files: ["components/gl/**/*.{ts,tsx}"],
    rules: {
      "react-hooks/immutability": "off",
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
