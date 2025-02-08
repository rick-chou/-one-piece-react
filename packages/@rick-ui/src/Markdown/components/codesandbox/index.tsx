import { useTheme } from '../../../ThemeProvider/useTheme';

const Codesandbox: React.FC<{ id: string }> = ({ id }) => {
  const { theme } = useTheme();
  return (
    <iframe
      src={`https://codesandbox.io/embed/${id}?autoresize=1&fontsize=14&hidenavigation=1&theme=${theme}`}
      className="w-full h-[500px] border-0 rounded-sm overflow-hidden"
      title={id}
      allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
    ></iframe>
  );
};

export default Codesandbox;
