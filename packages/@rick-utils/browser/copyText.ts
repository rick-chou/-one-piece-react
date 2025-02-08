import { message } from 'antd';

export const copyText = async (text: string, showSuccessMsg = true) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.log('error', error);
    const input = document.createElement('input');
    input.style.cssText += `; opacity: 0;`;
    document.body.appendChild(input);
    input.value = text;
    input.select();
    document.execCommand('copy');
    input.remove();
  }

  if (showSuccessMsg) void message.success(`Copy successful!`);
};
