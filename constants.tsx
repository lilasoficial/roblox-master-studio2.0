import { 
  Home, 
  Lightbulb, 
  Code, 
  Map as MapIcon, 
  Box, 
  LayoutTemplate, 
  Gamepad2, 
  GraduationCap, 
  ShoppingCart, 
  Settings 
} from 'lucide-react';
import { Translation, NavItem } from './types';

export const TRANSLATIONS: Translation = {
  'nav.home': { pt: 'Início', en: 'Home' },
  'nav.ideas': { pt: 'Ideias', en: 'Ideas' },
  'nav.scripts': { pt: 'Scripts', en: 'Scripts' },
  'nav.maps': { pt: 'Mapas', en: 'Maps' },
  'nav.models': { pt: 'Modelagem', en: 'Models' },
  'nav.gui': { pt: 'Interface', en: 'GUI' },
  'nav.gameplay': { pt: 'Jogabilidade', en: 'Gameplay' },
  'nav.learn': { pt: 'Aprender', en: 'Learn' },
  'nav.shop': { pt: 'Loja', en: 'Shop' },
  'nav.settings': { pt: 'Conta', en: 'Account' },
  
  'hero.title': { pt: 'Crie seu Jogo dos Sonhos', en: 'Create Your Dream Game' },
  'hero.subtitle': { pt: 'Plataforma completa para desenvolvedores Roblox com IA integrada.', en: 'Complete platform for Roblox developers with integrated AI.' },
  'hero.cta': { pt: 'Começar Grátis', en: 'Start for Free' },
  
  'idea.title': { pt: 'Gerador de Ideias IA', en: 'AI Idea Generator' },
  'idea.desc': { pt: 'Escolha um gênero e deixe a IA criar o conceito.', en: 'Choose a genre and let AI create the concept.' },
  'idea.btn': { pt: 'Gerar Ideia', en: 'Generate Idea' },
  
  'script.title': { pt: 'Estúdio de Scripts Lua', en: 'Lua Script Studio' },
  'script.placeholder': { pt: 'Descreva o que você quer que o script faça...', en: 'Describe what you want the script to do...' },
  'script.generate': { pt: 'Gerar Script', en: 'Generate Script' },
  
  'shop.title': { pt: 'Loja de Assets', en: 'Asset Store' },
  'shop.buy': { pt: 'Comprar', en: 'Buy' },
  
  'chat.placeholder': { pt: 'Pergunte sobre Roblox Studio...', en: 'Ask about Roblox Studio...' },
  'chat.send': { pt: 'Enviar', en: 'Send' },
  
  'login.roblox': { pt: 'Entrar com Roblox', en: 'Login with Roblox' },
  'status.loading': { pt: 'Processando...', en: 'Processing...' },
  'status.error': { pt: 'Erro ao conectar', en: 'Connection Error' },
};

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', icon: Home, labelKey: 'nav.home' },
  { id: 'ideas', icon: Lightbulb, labelKey: 'nav.ideas' },
  { id: 'scripts', icon: Code, labelKey: 'nav.scripts' },
  { id: 'maps', icon: MapIcon, labelKey: 'nav.maps' },
  { id: 'models', icon: Box, labelKey: 'nav.models' },
  { id: 'gui', icon: LayoutTemplate, labelKey: 'nav.gui' },
  { id: 'gameplay', icon: Gamepad2, labelKey: 'nav.gameplay' },
  { id: 'learn', icon: GraduationCap, labelKey: 'nav.learn' },
  { id: 'shop', icon: ShoppingCart, labelKey: 'nav.shop' },
];