import { useTheme } from '@rickzhou/react-ui';

const Codepen: React.FC<{ id: string }> = ({ id }) => {
  const { theme } = useTheme();
  return (
    <iframe
      className="h-[500px] w-full overflow-hidden rounded-sm border-0"
      title="codepen"
      src={`https://codepen.io/graphilla/embed/${id}?%2Cresult&editable=true&theme-id=${theme}`}
      loading="lazy"
    />
  );
};

export default Codepen;
