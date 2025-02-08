import Chance from 'chance';

type Options = {
  size: number;
  lines: number;
  circles: number;
  triangles: number;
  opacity: number;
  background: string;
};

const chance = new Chance() as Chance.Chance & {
  svg: (opts?: Partial<Options>) => string;
};

// Generate a svg randomly
chance.mixin({
  svg(
    options = {
      size: 40,
      lines: 20,
      circles: 10,
      triangles: 10,
      opacity: 0.3,
      background: chance.color(),
    },
  ) {
    // Create a coordinate within an area bigger than the svg
    function point(min = -50, max = 150) {
      return chance.integer({
        min,
        max,
      });
    }

    // Generate the actual svg
    // Docs: developer.mozilla.org/en-US/docs/Web/SVG/Element/line
    // viewBox use: stackoverflow.com/q/17498855
    let svg = '<svg version="1.1" viewBox="0 0 24 24"';
    svg += 'xmlns="http://www.w3.org/2000/svg"';
    svg += 'style="background-color:' + options.background + '">';
    for (let i = 0; i < options.lines; i++) {
      svg += '<line stroke="' + chance.color() + '" ';
      svg += 'stroke-width="' + point(1, 5) + '" ';
      svg += 'opacity="' + options.opacity + '" ';
      svg += 'x1="' + point() + '" y1="' + point() + '" ';
      svg += 'x2="' + point() + '" y2="' + point() + '" />';
    }

    for (let i = 0; i < options.circles; i++) {
      svg += '<circle cx="' + point() + '" ';
      svg += 'cy="' + point() + '" ';
      svg += 'r="' + point(1, options.size / 2) + '" ';
      svg += 'opacity="' + options.opacity + '" ';
      svg += 'fill="' + chance.color() + '"/>';
    }

    for (let i = 0; i < options.triangles; i++) {
      const s = options.size;
      svg += '<polygon fill="' + chance.color() + '" points="';
      svg += point() + ',' + point() + ' ';
      svg += point(-s, s) + ',' + point(-s, s) + ' ';
      svg += point(-s, s) + ',' + point(-s, s);
      svg += '" opacity="' + options.opacity + '" ';
      svg += 'fill="' + chance.color() + '"/>';
    }

    return svg + '</svg>';
  },
});

export const genRandomSvg = (options?: Partial<Options>) => {
  return chance.svg(options);
};

export const isMac = () => {
  return /(Mac|iP[ahno]+[de])/i.test(navigator.userAgent);
};
