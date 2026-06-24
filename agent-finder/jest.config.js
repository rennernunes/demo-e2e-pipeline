module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // Alterado para 'jsdom' para suportar testes de componentes React
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testMatch: ['**/__tests__/**/*.test.(ts|tsx)'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'], // Adicionado para configurar o ambiente de testes
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy', // Para lidar com imports de estilos
  },
};