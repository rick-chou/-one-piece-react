import { useTheme } from '@rickzhou/react-ui';

const Codesandbox: React.FC<{ id: string }> = ({ id }) => {
  const { theme } = useTheme();
  return (
    <iframe
      src={`https://codesandbox.io/embed/${id}?autoresize=1&fontsize=14&hidenavigation=1&theme=${theme}`}
      className="h-[500px] w-full overflow-hidden rounded-sm border-0"
      title={id}
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
  );
};

export default Codesandbox;
