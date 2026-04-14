/**
 * Art Deco Midtown Walking Tour: 12 real stops.
 * A curated route from Grand Central to Rockefeller Center.
 * Sources: NYC Landmarks Preservation Commission, AIA Guide to NYC, Wikipedia.
 */

const artDecoTour = {
  id: 'art-deco-midtown',
  name: 'Art Deco Midtown',
  description: 'The greatest concentration of Art Deco architecture in the world, from Grand Central to Rockefeller Center.',
  duration: '2.5 hours',
  distance: '1.8 miles',
  stops: [
    {
      id: 1,
      name: 'Grand Central Terminal',
      address: '89 E 42nd St',
      lat: 40.7527,
      lng: -73.9772,
      architect: 'Reed & Stem + Warren & Wetmore',
      year: 1913,
      style: 'Beaux-Arts with Deco interior',
      story: 'The celestial ceiling in the Main Concourse was painted backwards by accident, reversing east and west. The Vanderbilts said it showed the sky as God would see it from above. Saved from demolition in the 1970s by Jackie Kennedy\'s landmark campaign.',
      highlights: [
        'Celestial ceiling with 2,500 painted stars',
        'Tennessee marble floors and 75-foot arched windows',
        'Whispering gallery outside the Oyster Bar',
      ],
      walkingTo: 'Exit onto 42nd Street, turn left (east). The Chanin Building is half a block away at the corner of Lexington.',
      affiliates: [
        { type: 'restaurant', name: 'The Campbell', note: 'Jazz Age cocktail bar inside the terminal', url: '#' },
        { type: 'tour', name: 'Grand Central Official Tour', note: 'Self-guided audio tour of the terminal', url: '#' },
      ],
    },
    {
      id: 2,
      name: 'Chanin Building',
      address: '122 E 42nd St',
      lat: 40.7518,
      lng: -73.9760,
      architect: 'Sloan & Robertson',
      year: 1929,
      style: 'Art Deco',
      story: 'Irwin Chanin rose from poverty on the Lower East Side to build this 56-story tower. The terracotta facade features the "City of Opportunity" relief, a visual autobiography of Chanin\'s rags-to-riches story. The lobby metalwork by Jacques Delamarre is among the finest in NYC.',
      highlights: [
        '"City of Opportunity" terracotta relief panels',
        'Bronze and iron lobby grillwork by Jacques Delamarre',
        'Buttressed crown with dramatic setbacks',
      ],
      walkingTo: 'Continue east on 42nd Street. The Chrysler Building is at the next corner, Lexington Avenue. You can\'t miss it.',
      affiliates: [
        { type: 'tour', name: '42nd Street Architecture Walk', note: 'Guided group tour of 42nd Street landmarks', url: '#' },
      ],
    },
    {
      id: 3,
      name: 'Chrysler Building',
      address: '405 Lexington Ave',
      lat: 40.7516,
      lng: -73.9755,
      architect: 'William Van Alen',
      year: 1930,
      style: 'Art Deco',
      story: 'The crown jewel of Art Deco. Van Alen secretly assembled the 185-foot stainless steel spire inside the building, then raised it through the roof in 90 minutes to steal the "tallest building" title from 40 Wall Street. The eagle gargoyles at the 61st floor are modeled after 1929 Chrysler hood ornaments.',
      highlights: [
        'Stainless steel sunburst crown with triangular windows',
        'Eagle gargoyles modeled on Chrysler hood ornaments',
        'Lobby of African marble and Edward Trumbull ceiling mural',
      ],
      walkingTo: 'Walk west on 42nd Street past Grand Central. The Daily News Building is 2 blocks east at 220 E 42nd.',
      affiliates: [
        { type: 'restaurant', name: 'The Lexington Brass', note: 'Art Deco brasserie in the Chrysler Building lobby', url: '#' },
      ],
    },
    {
      id: 4,
      name: 'Daily News Building',
      address: '220 E 42nd St',
      lat: 40.7503,
      lng: -73.9732,
      architect: 'Raymond Hood',
      year: 1930,
      style: 'Art Deco',
      story: 'The lobby\'s giant rotating globe and floor compass inspired the Daily Planet in Superman comics and films. Raymond Hood stripped the facade of ornament, using only vertical stripes of brown and white brick. It was the first step toward modernism in skyscraper design.',
      highlights: [
        'Rotating globe and floor compass in the lobby',
        'Inspiration for Superman\'s Daily Planet',
        'Vertical brick stripe facade (no horizontal lines)',
      ],
      walkingTo: 'Head back west on 42nd Street, then north on 5th Avenue. The Fred F. French Building is at 551 5th Ave (corner of 45th).',
      affiliates: [],
    },
    {
      id: 5,
      name: 'Fred F. French Building',
      address: '551 5th Ave',
      lat: 40.7549,
      lng: -73.9795,
      architect: 'H. Douglas Ives & Sloan & Robertson',
      year: 1927,
      style: 'Art Deco',
      story: 'The polychrome terracotta top combines Babylonian, Mesopotamian, and Egyptian motifs in brilliant color. Fred French was one of NYC\'s biggest real estate developers and wanted a building that advertised his ambition from blocks away. The lobby has bronze beehive motifs symbolizing industry.',
      highlights: [
        'Polychrome terracotta crown with Babylonian motifs',
        'Bronze beehive lobby motifs symbolizing industry',
        'Multicolored faience in golds, blues, and greens',
      ],
      walkingTo: 'Continue north on Park Avenue (one block east). The Helmsley Building straddles Park Avenue at 46th Street.',
      affiliates: [
        { type: 'restaurant', name: 'The Grill', note: 'Power-lunch spot in the former Four Seasons space nearby', url: '#' },
      ],
    },
    {
      id: 6,
      name: 'Helmsley Building',
      address: '230 Park Ave',
      lat: 40.7536,
      lng: -73.9767,
      architect: 'Warren & Wetmore',
      year: 1929,
      style: 'Art Deco / Beaux-Arts',
      story: 'Originally the New York Central Building, it straddles Park Avenue with two vehicle tunnels passing through its base. For decades it was the visual terminus of the Park Avenue vista, until the Pan Am (now MetLife) Building rose behind it in 1963. The gilded roofline crown lights up at night.',
      highlights: [
        'Vehicle tunnels through the building base',
        'Gilded pyramidal crown lit at night',
        'Grand lobby with ornamental bronze elevator doors',
      ],
      walkingTo: 'Continue north on Park Avenue 5 blocks. The Waldorf Astoria is at 301 Park Ave between 49th and 50th Streets.',
      affiliates: [],
    },
    {
      id: 7,
      name: 'Waldorf Astoria',
      address: '301 Park Ave',
      lat: 40.7564,
      lng: -73.9738,
      architect: 'Schultze & Weaver',
      year: 1931,
      style: 'Art Deco',
      story: 'The twin Art Deco towers with silver pinnacles have housed every sitting U.S. president since Hoover. The original Waldorf-Astoria on 34th Street was demolished to build the Empire State Building. Cole Porter lived in the Towers for 25 years until his death.',
      highlights: [
        'Twin Art Deco towers with silver pinnacles',
        'Legendary Starlight Roof ballroom',
        'Park Avenue facade stretching an entire block',
      ],
      walkingTo: 'Cross to the east side of Park Avenue. St. Bartholomew\'s Church is directly across at 325 Park Ave.',
      affiliates: [
        { type: 'tour', name: 'Waldorf Astoria History Walk', note: 'Lobby tour showcasing Art Deco details', url: '#' },
      ],
    },
    {
      id: 8,
      name: 'St. Bartholomew\'s Church',
      address: '325 Park Ave',
      lat: 40.7580,
      lng: -73.9725,
      architect: 'Bertram Goodhue',
      year: 1919,
      style: 'Byzantine Revival',
      story: 'A deliberate counterpoint to the Deco towers surrounding it. Goodhue\'s polychrome Byzantine dome and Romanesque portal (salvaged from the earlier church by McKim, Mead & White) create a low, colorful oasis amid the glass and steel. The church fought off developers to preserve its garden and community house.',
      highlights: [
        'Polychrome tile dome in Byzantine style',
        'Romanesque triple-arched portal from 1903',
        'Garden terrace (rare open space on Park Ave)',
      ],
      walkingTo: 'Walk west on 50th Street toward 6th Avenue. Rockefeller Center begins at 5th Avenue. The GE Building (30 Rock) is at 30 Rockefeller Plaza.',
      affiliates: [],
    },
    {
      id: 9,
      name: 'GE Building / 30 Rock',
      address: '30 Rockefeller Plaza',
      lat: 40.7589,
      lng: -73.9797,
      architect: 'Raymond Hood',
      year: 1933,
      style: 'Art Deco',
      story: 'The centerpiece of Rockefeller Center. Lee Lawrie\'s "Wisdom" relief above the entrance shows a bearded figure with compass in hand. Originally called the RCA Building, it housed NBC from day one. The slab shape tapers from wide to narrow, maximizing natural light on every floor.',
      highlights: [
        'Lee Lawrie\'s "Wisdom" relief above the entrance',
        'Top of the Rock observation deck',
        'Sert murals in the lobby (replacing the destroyed Diego Rivera mural)',
      ],
      walkingTo: 'Walk south through the Channel Gardens toward 6th Avenue. Radio City Music Hall is on the corner of 50th and 6th.',
      affiliates: [
        { type: 'tour', name: 'Top of the Rock', note: '70th-floor observation deck with open-air views', url: '#' },
        { type: 'restaurant', name: 'The Sea Grill', note: 'Seafood overlooking the ice rink at Rockefeller Center', url: '#' },
      ],
    },
    {
      id: 10,
      name: 'Radio City Music Hall',
      address: '1260 6th Ave',
      lat: 40.7601,
      lng: -73.9800,
      architect: 'Edward Durell Stone & Donald Deskey',
      year: 1932,
      style: 'Art Deco',
      story: 'The greatest Art Deco interior in the world. Donald Deskey designed everything: the carpets, the wallpaper, the bathrooms. The Grand Foyer\'s 60-foot ceiling and Ezra Winter\'s mural "The Fountain of Youth" set the tone. The Rockettes have performed here since opening night.',
      highlights: [
        'Grand Foyer with 60-foot ceiling',
        'Ezra Winter\'s "Fountain of Youth" mural',
        'Auditorium with sunset-arc proscenium arches',
      ],
      walkingTo: 'Walk south on 6th Avenue one block, then turn right onto 5th Avenue. The Atlas statue is at 630 5th Ave.',
      affiliates: [
        { type: 'tour', name: 'Radio City Stage Door Tour', note: 'Behind-the-scenes tour of the legendary theater', url: '#' },
      ],
    },
    {
      id: 11,
      name: 'Atlas Statue / International Building',
      address: '630 5th Ave',
      lat: 40.7585,
      lng: -73.9781,
      architect: 'Lee Lawrie (sculptor) / Reinhard & Hofmeister',
      year: 1937,
      style: 'Art Deco',
      story: 'Lee Lawrie\'s 15-foot bronze Atlas holds the celestial sphere on his shoulders, facing St. Patrick\'s Cathedral across 5th Avenue. The International Building behind it was designed for foreign consulates and trade offices. The north and south armillary spheres flanking the entrance represent the Old and New Worlds.',
      highlights: [
        '15-foot bronze Atlas holding the celestial sphere',
        'Dramatic contrast with St. Patrick\'s Cathedral across 5th Ave',
        'International Building lobby with marble and bronze details',
      ],
      walkingTo: 'Turn around and look south down the Channel Gardens toward the sunken plaza. This is the overview point for the full Rockefeller Center complex.',
      affiliates: [],
    },
    {
      id: 12,
      name: 'Rockefeller Center Overview',
      address: 'Between 48th and 51st Streets, 5th to 6th Avenues',
      lat: 40.7587,
      lng: -73.9787,
      architect: 'Associated Architects (Hood, Godley, Fouilhoux, Corbett, Harrison, MacMurray, Reinhard, Hofmeister)',
      year: 1939,
      style: 'Art Deco',
      story: 'The whole complex is the finale. 14 original buildings, 22 acres, built during the Great Depression. John D. Rockefeller Jr. bet everything on this "city within a city." The sunken plaza, the Channel Gardens, the rooftop gardens: it all works together as the greatest urban ensemble of the 20th century.',
      highlights: [
        'Channel Gardens with seasonal plantings',
        'Sunken plaza (ice rink in winter, cafe in summer)',
        'Prometheus fountain by Paul Manship',
      ],
      walkingTo: null,
      affiliates: [
        { type: 'tour', name: 'Rockefeller Center Tour', note: 'Official guided tour of the full complex', url: '#' },
        { type: 'restaurant', name: 'Bar SixtyFive', note: 'Rooftop cocktails at Rainbow Room level', url: '#' },
      ],
    },
  ],
  // Approximate walking route waypoints (not just straight lines between stops)
  routeWaypoints: [
    // Stop 1: Grand Central
    [40.7527, -73.9772],
    // Walk east on 42nd to Chanin
    [40.7521, -73.9765],
    // Stop 2: Chanin Building
    [40.7518, -73.9760],
    // Continue east to Chrysler
    [40.7517, -73.9757],
    // Stop 3: Chrysler Building
    [40.7516, -73.9755],
    // East on 42nd to Daily News
    [40.7510, -73.9745],
    [40.7505, -73.9735],
    // Stop 4: Daily News Building
    [40.7503, -73.9732],
    // Back west on 42nd, north on 5th Ave
    [40.7510, -73.9745],
    [40.7520, -73.9770],
    [40.7530, -73.9790],
    [40.7540, -73.9795],
    // Stop 5: Fred F. French Building
    [40.7549, -73.9795],
    // East to Park Ave, north
    [40.7545, -73.9775],
    [40.7538, -73.9770],
    // Stop 6: Helmsley Building
    [40.7536, -73.9767],
    // North on Park Ave
    [40.7545, -73.9755],
    [40.7555, -73.9745],
    // Stop 7: Waldorf Astoria
    [40.7564, -73.9738],
    // Cross Park Ave
    [40.7570, -73.9732],
    // Stop 8: St. Bartholomew's
    [40.7580, -73.9725],
    // West on 50th to Rockefeller Center
    [40.7585, -73.9740],
    [40.7585, -73.9760],
    [40.7585, -73.9780],
    // Stop 9: GE Building / 30 Rock
    [40.7589, -73.9797],
    // South through Channel Gardens to Radio City
    [40.7595, -73.9800],
    // Stop 10: Radio City Music Hall
    [40.7601, -73.9800],
    // South on 6th, east to 5th
    [40.7595, -73.9798],
    [40.7590, -73.9790],
    // Stop 11: Atlas Statue
    [40.7585, -73.9781],
    // Short walk to overview
    [40.7586, -73.9784],
    // Stop 12: Rockefeller Center Overview
    [40.7587, -73.9787],
  ],
};

export default artDecoTour;
