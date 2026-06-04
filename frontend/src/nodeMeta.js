import {
  ArrowLeftCircle,
  ArrowRightCircle,
  Database,
  FileText,
  Funnel,
  Globe,
  Mail,
  Sparkles,
  Table,
} from 'lucide-react';

export const nodeMeta = {
  customInput: {
    label: 'Input',
    tone: 'blue',
    Icon: ArrowRightCircle,
  },
  llm: {
    label: 'LLM',
    tone: 'purple',
    Icon: Sparkles,
  },
  customOutput: {
    label: 'Output',
    tone: 'green',
    Icon: ArrowLeftCircle,
  },
  text: {
    label: 'Text',
    tone: 'indigo',
    Icon: FileText,
  },
  api: {
    label: 'API',
    tone: 'cyan',
    Icon: Globe,
  },
  database: {
    label: 'Database',
    tone: 'emerald',
    Icon: Database,
  },
  email: {
    label: 'Email',
    tone: 'amber',
    Icon: Mail,
  },
  csv: {
    label: 'CSV',
    tone: 'teal',
    Icon: Table,
  },
  filter: {
    label: 'Filter',
    tone: 'rose',
    Icon: Funnel,
  },
};

export const getNodeMeta = (type, title) => {
  const key = type || title?.toLowerCase();
  return nodeMeta[key] || {
    label: title,
    tone: 'blue',
    Icon: FileText,
  };
};
