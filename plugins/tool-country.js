// SUBZERO 

const config = require('../config');
const { cmd, commands } = require('../command');
const axios = require("axios");

cmd({
  pattern: "country",

  alias: ["countryinfo", "info"],
  react: "🌍",
  desc: "Get information about a country, including its flag, capital, and more.",
  category: "utility",
  use: ".country <country_name>",
  filename: __filename,
}, async (conn, mek, msg, { from, args, reply }) => {
  try {
    const countryName = args.join(" ");
    if (!countryName) {
      return reply("❌ Please provide a country name. Example: `.country Indonesia`");
    }

    // Fetch country information from the API
    const response = await axios.get(`https://api.siputzx.my.id/api/tools/countryInfo?name=${encodeURIComponent(countryName)}`);
    const { status, data } = response.data;

    if (!status || !data) {
      return reply("❌ No information found for the specified country. Please try again.");
    }

    const {
      name,
      capital,
      flag,
      phoneCode,
      googleMapsLink,
      continent,
      coordinates,
      area,
      landlocked,
      languages,
      famousFor,
      constitutionalForm,
      neighbors,
      currency,
      drivingSide,
      alcoholProhibition,
      internetTLD,
      isoCode,
    } = data;

    // Format the country information message
    const countryMessage = `\`SUBZERO GLOBE\`\n\n
🌍 *Country*: ${name}
🏛️ *Capital*: ${capital}
📞 *Phone Code*: ${phoneCode}
📍 *Continent*: ${continent.name} ${continent.emoji}
🌐 *Google Maps*: ${googleMapsLink}
📏 *Area*: ${area.squareKilometers} km² (${area.squareMiles} mi²)
🚗 *Driving Side*: ${drivingSide}
🍺 *Alcohol Prohibition*: ${alcoholProhibition}
💻 *Internet TLD*: ${internetTLD}
💰 *Currency*: ${currency}
📜 *Constitutional Form*: ${constitutionalForm}
🗣️ *Languages*: ${languages.native.join(", ")} (${languages.codes.join(", ")})
🌟 *Famous For*: ${famousFor}
🧭 *Coordinates*: Latitude ${coordinates.latitude}, Longitude ${coordinates.longitude}
🛂 *ISO Code*: ${isoCode.alpha2} (${isoCode.alpha3}, ${isoCode.numeric})
    `;

    // Send the country information message with the flag as an image attachment
    await conn.sendMessage(from, {
      image: { url: flag }, // Attach the flag image
      caption: countryMessage, // Add the formatted message as caption
    });
  } catch (error) {
    console.error("Error fetching country information:", error);
    reply("❌ Unable to fetch country information. Please try again later.");
  }
});
