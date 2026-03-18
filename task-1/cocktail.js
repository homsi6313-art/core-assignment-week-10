import path from 'path';
import { writeFile } from 'fs/promises';

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

function generateMarkdown(drinks) {
  let markdown = '# Cocktail Recipes\n\n';

  for (const drink of drinks) {
    markdown += `## ${drink.strDrink}\n\n`;

    if (drink.strDrinkThumb) {
      markdown += `![${drink.strDrink}](${drink.strDrinkThumb}/medium)\n\n`;
    }

    markdown += `**Category**: ${drink.strCategory}\n\n`;
    markdown += `**Alcoholic**: ${drink.strAlcoholic === 'Alcoholic' ? 'Yes' : 'No'}\n\n`;

    markdown += `### Ingredients\n`;

    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}`];
      const measure = drink[`strMeasure${i}`];

      if (!ingredient) break;

      markdown += `- ${measure ? measure.trim() + ' ' : ''}${ingredient}\n`;
    }

    markdown += `\n`;
    markdown += `### Instructions\n`;
    markdown += `${drink.strInstructions}\n\n`;
    markdown += `Serve in: ${drink.strGlass}\n\n`;
    markdown += `---\n\n`;
  }

  return markdown;
}

export async function main() {
  if (process.argv.length < 3) {
    console.error('Please provide a cocktail name as a command line argument.');
    return;
  }

  const cocktailName = process.argv[2];
  const url = `${BASE_URL}/search.php?s=${cocktailName}`;

  const __dirname = import.meta.dirname;
  const outPath = path.join(__dirname, `./output/${cocktailName}.md`);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.drinks) {
      console.error('No cocktails found with that name.');
      await writeFile(outPath, `# No results found for "${cocktailName}"`);
      return;
    }

    const markdown = generateMarkdown(data.drinks);

    await writeFile(outPath, markdown);
    console.log(`File created at ${outPath}`);
  } catch (error) {
    console.error('Something went wrong:', error.message);
  }
}

// Do not change the code below
if (!process.env.VITEST) {
  main();
}