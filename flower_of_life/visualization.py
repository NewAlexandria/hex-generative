"""
Flower of Life Visualization Module

This module provides functions to render and save images of the Flower of Life
pattern for validation purposes.
"""

import os
import math
import numpy as np
import matplotlib.pyplot as plt
from typing import List, Tuple, Optional
try:
    from .flower_of_life import FlowerOfLife
except ImportError:
    from flower_of_life import FlowerOfLife


def generate_circle_centers(n_circles: int, radius: float = 1.0) -> List[Tuple[float, float]]:
    """
    Generate circle centers for the Flower of Life pattern with correct vesica piscis intersections.

    The Flower of Life construction follows these rules:
    1. Start with one circle at the origin
    2. Each circle's center must be exactly one radius distance from adjacent circles
    3. This creates vesica piscis intersections where circles overlap
    4. The pattern forms a hexagonal grid with proper intersections

    Args:
        n_circles: Number of circles to generate
        radius: Radius of each circle

    Returns:
        List of (x, y) coordinates for circle centers
    """
    centers = []

    if n_circles == 0:
        return centers

    # First circle at origin
    centers.append((0.0, 0.0))

    if n_circles == 1:
        return centers

    # For proper vesica piscis intersections, adjacent circle centers must be
    # exactly one radius distance apart. This creates the characteristic overlap.

    # Second circle - place at distance = radius (not 2*radius)
    # This creates a vesica piscis intersection
    centers.append((radius, 0.0))

    if n_circles == 2:
        return centers

    # Third circle - complete the vesica piscis triangle
    # Place at distance = radius from both existing circles
    # This forms an equilateral triangle with side length = radius
    centers.append((radius / 2, radius * math.sqrt(3) / 2))

    if n_circles == 3:
        return centers

    # Fourth circle - continue the hexagonal pattern
    # Place at distance = radius from the first circle
    centers.append((-radius / 2, radius * math.sqrt(3) / 2))

    if n_circles == 4:
        return centers

    # Fifth circle - continue the hexagonal pattern
    centers.append((-radius, 0.0))

    if n_circles == 5:
        return centers

    # Sixth circle - complete the first hexagonal ring
    centers.append((-radius / 2, -radius * math.sqrt(3) / 2))

    if n_circles == 6:
        return centers

    # Seventh circle - complete the basic Flower of Life (center + 6 around)
    centers.append((radius / 2, -radius * math.sqrt(3) / 2))

    if n_circles == 7:
        return centers

    # For n > 7, we need to expand the pattern
    # This is more complex and would require proper hexagonal grid expansion
    # For now, we'll add circles in a systematic way that maintains proper intersections

    # Add circles in the second ring
    # Each new circle should be at distance = radius from existing circles
    ring_centers = [
        (2 * radius, 0.0),  # Right
        (radius, radius * math.sqrt(3)),  # Top right
        (-radius, radius * math.sqrt(3)),  # Top left
        (-2 * radius, 0.0),  # Left
        (-radius, -radius * math.sqrt(3)),  # Bottom left
        (radius, -radius * math.sqrt(3)),  # Bottom right
    ]

    for center in ring_centers:
        if len(centers) >= n_circles:
            break
        centers.append(center)

    # If we still need more circles, continue with a systematic approach
    # This is a simplified version - a full implementation would require
    # more sophisticated hexagonal grid generation
    if len(centers) < n_circles:
        # Add circles at intersection points of existing circles
        # This is a placeholder for the full algorithm
        additional_centers = [
            (0, radius * math.sqrt(3)),  # Top center
            (0, -radius * math.sqrt(3)),  # Bottom center
            (radius * math.sqrt(3), radius),  # Top right
            (-radius * math.sqrt(3), radius),  # Top left
            (radius * math.sqrt(3), -radius),  # Bottom right
            (-radius * math.sqrt(3), -radius),  # Bottom left
        ]

        for center in additional_centers:
            if len(centers) >= n_circles:
                break
            centers.append(center)

    return centers[:n_circles]


def render_flower_of_life(n_circles: int,
                         radius: float = 1.0,
                         output_path: Optional[str] = None,
                         output_dir: Optional[str] = None,
                         overwrite: bool = False,
                         figsize: Tuple[int, int] = (10, 10),
                         dpi: int = 300) -> None:
    """
    Render the Flower of Life pattern and optionally save to file.

    Args:
        n_circles: Number of circles to draw
        radius: Radius of each circle
        output_path: Path to save the image (optional)
        output_dir: Directory to save image in (defaults to "flower_of_life_images")
        overwrite: Whether to overwrite existing files
        figsize: Figure size in inches
        dpi: Dots per inch for saved image
    """
    # Determine output path and directory
    if output_path is None and output_dir is None:
        # Default to saving in flower_of_life_images directory
        output_dir = "flower_of_life_images"
        os.makedirs(output_dir, exist_ok=True)
        output_path = os.path.join(output_dir, f"flower_of_life_{n_circles}_circles.png")
    elif output_dir is not None:
        # Save in specified directory
        os.makedirs(output_dir, exist_ok=True)
        if output_path is None:
            output_path = os.path.join(output_dir, f"flower_of_life_{n_circles}_circles.png")
        else:
            # Ensure output_path is in the specified directory
            filename = os.path.basename(output_path)
            output_path = os.path.join(output_dir, filename)

    # Check if file exists and overwrite is False
    if output_path and not overwrite and os.path.exists(output_path):
        print(f"File {output_path} already exists. Skipping rendering.")
        return

    # Generate circle centers
    centers = generate_circle_centers(n_circles, radius)

    # Create figure
    fig, ax = plt.subplots(figsize=figsize)
    ax.set_aspect('equal')
    ax.axis('off')

    # Calculate bounds
    if centers:
        x_coords = [c[0] for c in centers]
        y_coords = [c[1] for c in centers]

        x_min, x_max = min(x_coords) - radius, max(x_coords) + radius
        y_min, y_max = min(y_coords) - radius, max(y_coords) + radius

        # Add some padding
        padding = radius * 0.5
        ax.set_xlim(x_min - padding, x_max + padding)
        ax.set_ylim(y_min - padding, y_max + padding)

    # Draw circles
    for i, center in enumerate(centers):
        circle = plt.Circle(center, radius,
                           fill=False,
                           edgecolor='black',
                           linewidth=1.5)
        ax.add_artist(circle)

        # Add circle number annotation (optional, for debugging)
        # ax.annotate(str(i+1), center, ha='center', va='center', fontsize=8)

    # Add title
    ax.set_title(f'Flower of Life Pattern\n{n_circles} circles, {len(centers)} regions',
                 fontsize=14, pad=20)

    # Save or show
    if output_path:
        plt.savefig(output_path, bbox_inches='tight', dpi=dpi)
        print(f"Flower of Life image saved to {output_path}")
        plt.close(fig)
    else:
        plt.show()


def generate_validation_images(max_circles: int = 19,
                              output_dir: str = "flower_of_life_images",
                              overwrite: bool = False,
                              radius: float = 1.0) -> None:
    """
    Generate validation images for the Flower of Life pattern.

    Creates one image file for each count of circles from 1 to max_circles.

    Args:
        max_circles: Maximum number of circles to generate images for
        output_dir: Directory to save images
        overwrite: Whether to overwrite existing files
        radius: Radius of circles in the images
    """
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)

    print(f"Generating Flower of Life validation images...")
    print(f"Output directory: {output_dir}")
    print(f"Max circles: {max_circles}")
    print(f"Overwrite existing files: {overwrite}")
    print()

    # Generate images for each number of circles
    for n in range(1, max_circles + 1):
        output_path = os.path.join(output_dir, f"flower_of_life_{n}_circles.png")

        print(f"Generating image for {n} circles...")
        render_flower_of_life(n_circles=n,
                            radius=radius,
                            output_path=output_path,
                            overwrite=overwrite)

    print(f"\nCompleted generating {max_circles} validation images.")


def validate_with_visualization(n_circles: int,
                               output_dir: str = "flower_of_life_images",
                               overwrite: bool = False) -> dict:
    """
    Validate the region counting algorithm by comparing with visual rendering.

    Args:
        n_circles: Number of circles to validate
        output_dir: Directory for output images
        overwrite: Whether to overwrite existing files

    Returns:
        Dictionary with validation results
    """
    fol = FlowerOfLife()

    # Get the calculated region count
    calculated_regions = fol.count_regions(n_circles)

    # Generate the visualization
    output_path = os.path.join(output_dir, f"validation_{n_circles}_circles.png")
    render_flower_of_life(n_circles=n_circles,
                        output_path=output_path,
                        overwrite=overwrite)

    # Get circle centers for analysis
    centers = generate_circle_centers(n_circles)

    return {
        "n_circles": n_circles,
        "calculated_regions": calculated_regions,
        "circle_centers": centers,
        "image_path": output_path,
        "validation_notes": "Manual visual inspection required to count actual regions"
    }


def main():
    """Demonstrate the visualization functionality."""
    print("Flower of Life Visualization Demo")
    print("=" * 40)

    # Generate validation images
    generate_validation_images(max_circles=7, overwrite=False)

    # Show a single example
    print("\nRendering a single example (5 circles):")
    render_flower_of_life(n_circles=5, output_path="example_5_circles.png", overwrite=True)

    # Validate with visualization
    print("\nValidation example:")
    result = validate_with_visualization(n_circles=3, overwrite=True)
    print(f"Result: {result}")


if __name__ == "__main__":
    main()
