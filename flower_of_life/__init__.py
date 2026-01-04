"""
Flower of Life Region Counter

A Python implementation for counting intersecting regions in the Flower of Life
geometric pattern, designed to work in 2D with architecture for 3D extension.
"""

from .flower_of_life import FlowerOfLife

try:
    from .visualization import render_flower_of_life, generate_validation_images, validate_with_visualization
    __all__ = ["FlowerOfLife", "render_flower_of_life", "generate_validation_images", "validate_with_visualization"]
except ImportError:
    __all__ = ["FlowerOfLife"]

__version__ = "0.1.0"
