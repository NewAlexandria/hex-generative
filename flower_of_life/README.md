# Flower of Life Region Counter

A Python implementation for counting intersecting regions in the Flower of Life geometric pattern. This implementation uses pattern-based formulas derived from observed sequences, designed to work efficiently in 2D with architecture for future 3D extension.

## Overview

The Flower of Life is a sacred geometric pattern composed of multiple evenly-spaced, overlapping circles arranged in a hexagonal configuration. This pattern is significant in sacred geometry and represents fundamental aspects of space and creation.

## Mathematical Background

### The Pattern Sequence

Based on **empirical measurements from visual verification**, the Flower of Life pattern follows this sequence:

- **Number of circles**: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, ...
- **Number of regions**: 1, 3, 7, 11, 15, 19, 24, 27, 29, 32, 36, 39, ...
- **Intervals**: 0, 2, 4, 4, 4, 4, 5, 3, 2, 3, 4, 3, ...

### Pattern Analysis

The sequence shows:

1. **n=1**: 1 region (single circle)
2. **n=2**: 3 regions (adds 2 regions via vesica piscis intersection)
3. **n=3**: 7 regions (adds 4 regions)
4. **n=4-6**: Each adds 4 regions consistently
5. **n=7**: Adds 5 regions
6. **n=8-12**: Irregular intervals (3, 2, 3, 4, 3) - the pattern becomes complex!
7. **n>12**: Extrapolated using average increment of ~3 regions per circle

**Important Note**: The intervals after circle 7 do not follow a simple linear pattern. The values for circles 1-12 are from actual visual counts and are stored as empirical measurements in the code. Values beyond 12 circles are approximations and should be verified visually for accuracy.

### Related Mathematics

This problem is related to:

- **Venn diagram region counting**: [Wikipedia - Venn Diagram Extensions](https://en.wikipedia.org/wiki/Venn_diagram#Extensions_to_higher_numbers_of_sets)
- **Euler characteristic**: V - E + F = 2 for planar graphs
- **Circle arrangement theory**: Maximum regions formed by n circles = n² - n + 2 (general case)

However, the Flower of Life has specific hexagonal symmetry constraints that differ from general circle arrangements.

## Installation

```bash
# Clone or download the flower_of_life directory
cd /path/to/your/project

# For visualization features, install dependencies:
pip install matplotlib numpy
# Or: python3 -m pip install --break-system-packages matplotlib numpy
```

## Usage

### Basic Usage

```python
from flower_of_life import FlowerOfLife

# Create a Flower of Life counter
fol = FlowerOfLife()

# Count regions for different numbers of circles
for n in range(1, 8):
    regions = fol.count_regions(n)
    print(f"Circles: {n}, Regions: {regions}")
```

### Getting Progressions

```python
# Get the complete sequence up to 10 circles
progression = fol.get_progression(10)
print(f"Progression: {progression}")

# Get the intervals between consecutive counts
intervals = fol.get_intervals(10)
print(f"Intervals: {intervals}")
```

### Pattern Analysis

```python
# Get detailed pattern analysis
analysis = fol.get_pattern_analysis(15)
print(f"Average interval: {analysis['average_interval']}")
print(f"Pattern type: {analysis['pattern_type']}")
```

### Visualization

The visualization functions render the Flower of Life pattern with correct **vesica piscis intersections**. Each circle's center is positioned exactly one radius distance from adjacent circles, creating the characteristic overlapping regions.

```python
# Render a single pattern (saved in flower_of_life_images by default)
fol.render_pattern(n_circles=5, overwrite=True)

# Render with custom directory
fol.render_pattern(n_circles=3, output_dir="my_patterns", overwrite=True)

# Render with custom filename in specific directory
fol.render_pattern(n_circles=7, output_path="custom_name.png", output_dir="custom_folder", overwrite=True)

# Generate validation images for all counts
fol.generate_validation_images(max_circles=19, output_dir="validation_images", overwrite=False)

# Direct visualization functions
from flower_of_life import render_flower_of_life, generate_validation_images

# Render single pattern (defaults to flower_of_life_images directory)
render_flower_of_life(n_circles=3)

# Render with custom directory
render_flower_of_life(n_circles=5, output_dir="test_images")

# Generate all validation images
generate_validation_images(max_circles=19, output_dir="flower_of_life_images")
```

**Key Visualization Features:**

- **Vesica Piscis Intersections**: Circles overlap correctly with characteristic petal shapes
- **Hexagonal Grid**: Proper geometric arrangement following Flower of Life construction rules
- **Organized File Management**: Images are always saved in folders for better organization
- **Flexible Output Options**: Specify custom directories, filenames, or use defaults
- **File Existence Checking**: Skips existing files by default, supports overwrite option
- **High Resolution**: 300 DPI output for detailed inspection

## API Reference

### FlowerOfLife Class

#### `__init__(dimension=2)`

Initialize the Flower of Life counter.

**Parameters:**

- `dimension` (int): Currently only 2D is supported (3D planned for future)

**Raises:**

- `NotImplementedError`: If dimension is not 2

#### `count_regions(n_circles)`

Count the number of intersecting regions for n circles in the pattern.

**Parameters:**

- `n_circles` (int): Number of circles in the Flower of Life pattern

**Returns:**

- `int`: Number of distinct regions formed by circle intersections

**Raises:**

- `ValueError`: If n_circles is negative

#### `get_progression(max_circles)`

Get the complete sequence of region counts up to max_circles.

**Parameters:**

- `max_circles` (int): Maximum number of circles to calculate

**Returns:**

- `List[int]`: List of region counts for 1 to max_circles circles

#### `get_intervals(max_circles)`

Get the sequence of intervals (differences between consecutive counts).

**Parameters:**

- `max_circles` (int): Maximum number of circles to calculate

**Returns:**

- `List[int]`: List of intervals between consecutive region counts

#### `validate_known_sequence()`

Validate that our implementation matches the known sequence.

**Returns:**

- `bool`: True if all known values match our calculations

#### `get_pattern_analysis(max_circles=10)`

Analyze the pattern characteristics for documentation.

**Parameters:**

- `max_circles` (int): Maximum number of circles to analyze

**Returns:**

- `dict`: Dictionary with pattern analysis results

#### `render_pattern(n_circles, output_path=None, overwrite=False, radius=1.0)`

Render the Flower of Life pattern for validation.

**Parameters:**

- `n_circles` (int): Number of circles to render
- `output_path` (str, optional): Path to save the image
- `overwrite` (bool): Whether to overwrite existing files
- `radius` (float): Radius of circles in the image

#### `generate_validation_images(max_circles=19, output_dir="flower_of_life_images", overwrite=False)`

Generate validation images for the Flower of Life pattern.

**Parameters:**

- `max_circles` (int): Maximum number of circles to generate images for (default: 19 for full Flower of Life pattern)
- `output_dir` (str): Directory to save images
- `overwrite` (bool): Whether to overwrite existing files

**Note:** `max_circles` is primarily a visualization parameter. The underlying counting algorithm can handle any number of circles through extrapolation. The default of 19 circles represents the complete Flower of Life pattern with two rings around the center.

## Examples

Run the examples to see the implementation in action:

```bash
cd flower_of_life
python examples.py
```

This will demonstrate:

- Basic usage patterns
- Progression calculations
- Validation against known sequences
- Pattern analysis
- Edge case handling
- Error handling
- Visualization capabilities

## Future Extensions

### 3D Implementation

The architecture is designed to support 3D Flower of Life (spheres instead of circles) in the future. Key considerations:

1. **Sphere Packing**: Use face-centered cubic (FCC) or hexagonal close-packed (HCP) arrangements
2. **Intersection Geometry**: Spheres intersect in circles, creating more complex 3D regions
3. **Volume Calculations**: Count enclosed volumes rather than planar regions
4. **Computational Complexity**: 3D will require more sophisticated geometric algorithms

### Visualization

Future versions may include:

- Matplotlib-based 2D visualization
- 3D rendering with spheres and intersections
- Interactive exploration of the pattern
- Export capabilities for CAD/3D modeling

## References

- [Venn Diagram Extensions](https://en.wikipedia.org/wiki/Venn_diagram#Extensions_to_higher_numbers_of_sets)
- Kung, M.L. & Harrison, G.C. (1984). "Is the Venn Diagram Good Enough?" _The College Mathematics Journal_, 15(1), 48-50
- Euler characteristic for planar graphs: V - E + F = 2
- Sacred geometry and Flower of Life patterns

## License

This implementation is part of the hex-generative project. See the main project README for licensing information.

## Contributing

This is a research implementation focused on pattern analysis and mathematical modeling. Contributions that improve the accuracy of the pattern formulas or extend to 3D are welcome.
