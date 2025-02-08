import { ContentWrapper } from '@rickzhou/awesome/theme/content-wrapper';
import { useTheme } from '@rickzhou/react-ui';
import { random } from 'lodash-es';
import {
  BiLogoAngular,
  BiLogoHtml5,
  BiLogoNodejs,
  BiLogoReact,
  BiLogoTailwindCss,
  BiLogoTypescript,
  BiLogoVisualStudio,
  BiLogoVuejs,
} from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { listItemStyle, ulStyle } from './style';

const Navigation = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  return (
    <ContentWrapper>
      <ul
        css={ulStyle}
        onClick={async e => {
          e.preventDefault();
          const { metaData } = await import(
            '@rickzhou/awesome/router/meta-data'
          );
          const paths = Object.values(metaData).flat();
          const randomPath = paths.at(random(0, paths.length));
          navigate(randomPath!.path);
        }}>
        <li>
          <a css={listItemStyle} href="">
            <BiLogoReact color={isDark() ? '#FFF' : '#000'} />
          </a>
        </li>
        <li>
          <a css={listItemStyle} href="">
            <BiLogoVuejs color={isDark() ? '#FFF' : '#000'} />
          </a>
        </li>
        <li>
          <a css={listItemStyle} href="">
            <BiLogoAngular color={isDark() ? '#FFF' : '#000'} />
          </a>
        </li>
        <li>
          <a css={listItemStyle} href="">
            <BiLogoHtml5 color={isDark() ? '#FFF' : '#000'} />
          </a>
        </li>
        <li>
          <a css={listItemStyle} href="">
            <BiLogoTailwindCss color={isDark() ? '#FFF' : '#000'} />
          </a>
        </li>
        <li>
          <a css={listItemStyle} href="">
            <BiLogoNodejs color={isDark() ? '#FFF' : '#000'} />
          </a>
        </li>
        <li>
          <a css={listItemStyle} href="">
            <BiLogoTypescript color={isDark() ? '#FFF' : '#000'} />
          </a>
        </li>
        <li>
          <a css={listItemStyle} href="">
            <BiLogoVisualStudio color={isDark() ? '#FFF' : '#000'} />
          </a>
        </li>
      </ul>
    </ContentWrapper>
  );
};

export default Navigation;
