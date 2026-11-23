import { defineConfig } from 'eslint/config';
import next from 'eslint-config-next/core-web-vitals';

export default defineConfig([...next, { rules: { 'react/no-unescaped-entities': 'off' } }]);
