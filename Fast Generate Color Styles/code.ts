//#region "About"
/*
  Fast Generate Color Style for Figma
  Date: October 2023
  Author: Loi Tran, email: work.frog2005@gmail.com

  Donate (optional):
  If you find this script helpful, you can buy me a coffee
  - via Buymeacoffee https://www.buymeacoffee.com/lowf2505
  - via Paypal: https://paypal.me/lowf2505

  Released under the MIT license
  http://opensource.org/licenses/mit-license.php

*/
//#endregion

//Function add color style
function createColorStyle(name: string, color: RGB) {
  const style = figma.createPaintStyle();
  style.name = name;
  style.paints = [{type: 'SOLID', color}];
}

//Function create rectangles
function createRectangle(x: number, y: number, color: RGB, name: string, cornerRadius: number) {
  const rect = figma.createRectangle();
  rect.x = x;
  rect.y = y;
  rect.fills = [{type: 'SOLID', color}];
  rect.name = name;
  rect.cornerRadius = cornerRadius;
  return rect;
}

// Check to see if any objects are selected
if (figma.currentPage.selection.length > 0) {
  // Get the first object selected
  const selectedNode = figma.currentPage.selection[0];
  // Checks if the object has a fills property
  if ('fills' in selectedNode && (selectedNode.fills as readonly Paint[]).length > 0) {
    const fill = (selectedNode.fills as readonly Paint[])[0] as SolidPaint;
    if (fill.type === 'SOLID') {
      //Primary Color
      const r = Math.round(fill.color.r * 255);
      const g = Math.round(fill.color.g * 255);
      const b = Math.round(fill.color.b * 255);

      //Text Color
      const rText = Math.round((0.8 * 0) + (0.2*r));
      const gText = Math.round((0.8 * 0) + (0.2*g));
      const bText = Math.round((0.8 * 0) + (0.2*b));

      //Light Background
      const rLBG = Math.round((0.92 * 255) + (0.08*r));
      const bLBG = Math.round((0.92 * 255) + (0.08*b));
      const gLBG = Math.round((0.92 * 255) + (0.08*g));

      //Stroke
      const rStroke = Math.round((0.75 * 194) + (0.25*r));
      const bStroke = Math.round((0.75 * 194) + (0.25*b));
      const gStroke = Math.round((0.75 * 194) + (0.25*g));

      //Secondary
      const rSec = Math.round((0.70 * 255) + (0.3*r));
      const bSec = Math.round((0.70 * 255) + (0.3*b));
      const gSec = Math.round((0.70 * 255) + (0.3*g));

      //Sub Text Color
      const rSText = Math.round((0.52 * 255) + (0.48*rText));
      const gSText = Math.round((0.52 * 255) + (0.48*gText));
      const bSText = Math.round((0.52 * 255) + (0.48*bText));

      //declare Colors
      const colors = [
        {color: {r: r/255, g: g/255, b: b/255}, name: "Primary"},
        {color: {r: rText/255, g: gText/255, b: bText/255}, name: "Text"},
        {color: {r: rLBG/255, g: gLBG/255, b: bLBG/255}, name: "Light Background"},
        {color: {r: rStroke/255, g: gStroke/255, b: bStroke/255}, name: "Stroke"},
        {color: {r: rSec/255, g: gSec/255, b: bSec/255}, name: "Secondary Color"},
        {color: {r: rSText/255, g: gSText/255, b: bSText/255}, name: "Sub Text"},
        {color: {r: 1, g: 1, b: 1}, name: "White"},
        {color: {r: 0, g: 0, b: 0}, name: "Black"},
        {color: {r:43/255, g: 43/255, b: 43/255}, name: "Black #2b2b2b"}
      ];
      
      //Add color style and create rectangle for each Color
      const rectangles = colors.map((item, index) => {
        const x = 50 + index * 150; //Space 50px between each rectangle
        createColorStyle(item.name, item.color);
        return createRectangle(x, selectedNode.y, item.color, item.name,16);
      });

      const group = figma.group(rectangles, figma.currentPage);
      group.name = "Fast Generate Color Style";
      group.x = selectedNode.x + selectedNode.width + 50; // Place the the group next to object
    }
  }
} else {
  figma.closePlugin('Please pick an object.');
}
figma.closePlugin('Color styles were added');


















//#region "Draft code"

 // Convert RGB to HEX from picked color
      // const hexValue =(1 << 24) + (r << 16) + (g << 8) + b;
      // const hexColor = '#' + (hexValue).toString(16).slice(1).toUpperCase();
//#endregion 