/**
* A 16 color palette inspired by Japanese computers like the MSX.
* @constant
* @type {number}
*/
Phaser.Create.PALETTE_JAPANESE_MACHINE = 4;

Phaser.Create.prototype = {

    /**
     * Generates a new PIXI.Texture from the given data, which can be applied to a Sprite.
     *
     * This allows you to create game graphics quickly and easily, with no external files but that use actual proper images
     * rather than Phaser.Graphics objects, which are expensive to render and limited in scope.
     *
     * Each element of the array is a string holding the pixel color values, as mapped to one of the Phaser.Create PALETTE consts.
     *
     * For example:
     *
     * `var data = [
     *   ' 333 ',
     *   ' 777 ',
     *   'E333E',
     *   ' 333 ',
     *   ' 3 3 '
     * ];`
     *
     * `game.create.texture('bob', data);`
     *
     * The above will create a new texture called `bob`, which will look like a little man wearing a hat. You can then use it
     * for sprites the same way you use any other texture: `game.add.sprite(0, 0, 'bob');`
     *
     * @method Phaser.Create#texture
     * @param {string} key - The key used to store this texture in the Phaser Cache.
     * @param {array} data - An array of pixel data.
     * @param {integer} [pixelWidth=8] - The width of each pixel.
     * @param {integer} [pixelHeight=8] - The height of each pixel.
     * @param {integer} [palette=0] - The palette to use when rendering the texture. One of the Phaser.Create.PALETTE consts.
     * @return {PIXI.Texture} The newly generated texture.
     */
    texture: function (key, data, pixelWidth, pixelHeight, palette) {

        if (pixelWidth === undefined) { pixelWidth = 8; }
        if (pixelHeight === undefined) { pixelHeight = pixelWidth; }
        if (palette === undefined) { palette = 0; }

        var w = data[0].length * pixelWidth;
        var h = data.length * pixelHeight;

        //  No bmd? Let's make one
        if (this.bmd === null)
        {
            this.bmd = this.game.make.bitmapData();
            this.canvas = this.bmd.canvas;
            this.ctx = this.bmd.context;
        }

        this.bmd.resize(w, h);
        this.bmd.clear();

        //  Draw it
        for (var y = 0; y < data.length; y++)
        {
            var row = data[y];

            for (var x = 0; x < row.length; x++)
            {
                var d = row[x];

                if (d !== '.' && d !== ' ')
                {
                    this.ctx.fillStyle = this.palettes[palette][d];
                    this.ctx.fillRect(x * pixelWidth, y * pixelHeight, pixelWidth, pixelHeight);
                }
            }
        }

        return this.bmd.generateTexture(key);

    },

    /**
     * Creates a grid texture based on the given dimensions.
     *
     * @method Phaser.Create#grid
     * @param {string} key - The key used to store this texture in the Phaser Cache.
     * @param {integer} width - The width of the grid in pixels.
     * @param {integer} height - The height of the grid in pixels.
     * @param {integer} cellWidth - The width of the grid cells in pixels.
     * @param {integer} cellHeight - The height of the grid cells in pixels.
     * @param {string} color - The color to draw the grid lines in. Should be a Canvas supported color string like `#ff5500` or `rgba(200,50,3,0.5)`.
     * @return {PIXI.Texture} The newly generated texture.
     */
    grid: function (key, width, height, cellWidth, cellHeight, color) {

        //  No bmd? Let's make one
        if (this.bmd === null)
        {
            this.bmd = this.game.make.bitmapData();
            this.canvas = this.bmd.canvas;
            this.ctx = this.bmd.context;
        }

        this.bmd.resize(width, height);

        this.ctx.fillStyle = color;

        for (var y = 0; y < height; y += cellHeight)
        {
            this.ctx.fillRect(0, y, width, 1);
        }

        for (var x = 0; x < width; x += cellWidth)
        {
            this.ctx.fillRect(x, 0, 1, height);
        }

        return this.bmd.generateTexture(key);

    }

};

Phaser.Create.prototype.constructor = Phaser.Create;