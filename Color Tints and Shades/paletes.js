
function createPalete(base_colour, reduction, mode) {
    var mono_palette = [base_colour];

    // Dame los colores de los que se compone mi color
    var red = [base_colour red];
    var green = [base_colour green];
    var blue = [base_colour blue];
    var colour_alpha = [base_colour alpha];



    if (mode == "tints"){

        var tints = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
        for (var i=0; i < tints.length; i++){
          mono_palette.push([MSColor colorWithRed: (red + (1-red) * tints[i]) green: (green + (1-green) * tints[i]) blue: (blue + (1-blue) * tints[i]) alpha: colour_alpha]);
        }

    } else if (mode == "shades") {

        var shades = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
        for (var i=0; i < shades.length; i++){
          mono_palette.push([MSColor colorWithRed: (red * shades[i]) green: (green * shades[i]) blue: (blue * shades[i]) alpha: colour_alpha]);
        }

    }

    return mono_palette;
};


function drawPalete(base_layer, colours_array) {

    var first_colour = colours_array[0];
    var palette_layers = [base_layer];

    var first_fill = [[[base_layer style] fills] firstObject];
    [first_fill setColor: first_colour];

    for(var i = 1; i < colours_array.length; i++) {
      var previous_layer = palette_layers[palette_layers.length -1];
      var new_colour_layer = [previous_layer duplicate];

      var new_colour = colours_array[i];
      [[[[new_colour_layer style] fills] firstObject] setColor: new_colour];

      var current_x_pos = [[new_colour_layer frame] x];
      var new_x_position = current_x_pos + [[new_colour_layer frame] width];

      
      moveToXPosition(new_colour_layer, new_x_position);

      palette_layers.push(new_colour_layer);
    }

};


function moveToXPosition(item, new_x_pos) {
    var current_x_pos = [[item frame] x];
    [[item frame] subtractX: current_x_pos - 1];
    [[item frame] addX: new_x_pos - 1];

};
