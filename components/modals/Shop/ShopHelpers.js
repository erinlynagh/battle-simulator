export const generateButtonClass = "py-2 px-4 rounded mx-2 md:w-1/2 ";
export const generateButtonEnabled =
  generateButtonClass + " bg-green-700 hover:text-green-700 hover:bg-gray-300";
export const generateButtonDisabled = generateButtonClass + " bg-gray-600";

export function SpellTierButtons(selectedTier, setTier, Titles) {
  let modifier = 0;
  let label = "Power: ";
  if (Titles[0] === "Items") {
    modifier = 3;
    label = "Category: ";
  }
  return Titles.map((number, i) => {
    let className = "flex mx-1 rounded px-2 border-2 border-blue-600";
    if (selectedTier === i + modifier) {
      className += " bg-blue-600 text-gray-300";
    } else {
      className += " text-blue-600 hover:bg-blue-600 hover:text-gray-300";
    }
    return (
      <div key={i} className={className} onClick={() => setTier(modifier + i)}>
        {number}
      </div>
    );
  });
}
