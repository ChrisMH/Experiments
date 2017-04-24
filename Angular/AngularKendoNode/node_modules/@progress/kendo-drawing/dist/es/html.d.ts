import { Group } from './shapes'
import { PaperSize, PageMargin } from './pdf';

/**
 * The configuration options for the `drawDOM` method.
 */
interface DrawOptions {
  /**
   * A flag indicating whether to produce clickable hyperlinks in the exported PDF file.
   * It is also possible to pass a CSS selector as argument. All matching links are ignored.
   *
   * @default false
   */
  avoidLinks: boolean | string;

  /**
   * An optional CSS selector that specifies the elements that should cause page breaks.
   */
  forcePageBreak: string;

  /**
   * The paper size for automatic page breaking.
   * The default `"auto"` means the paper size is determined by the content.
   *
   * @default "auto"
   */
  paperSize: PaperSize;

  /**
   * Specifies the margins of the page (numbers or strings with units).
   */
  margin: PageMargin;

  /**
   * The page template for multi-page output.
   */
  template: string
}

/**
 * Converts the given DOM element to a drawing scene.
 * The operation is asynchronous and returns a promise that will be resolved with the root Group of the scene.
 *
 * @param element - The root DOM element to draw.
 * @param options - Conversion options.
 * @return - A promise that will be resolved with the root Group of the scene.
 */
export function drawDOM(element: HTMLElement, options?: DrawOptions): Promise<Group>;
