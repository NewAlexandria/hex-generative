"""
Flower of Life Counter - Usage Examples

This module demonstrates how to use the FlowerOfLife class to count
intersecting regions in the Flower of Life geometric pattern.
"""

try:
    from .flower_of_life import FlowerOfLife
except ImportError:
    from flower_of_life import FlowerOfLife


def basic_usage_example():
    """Demonstrate basic usage of the FlowerOfLife class."""
    print("=== Basic Usage Example ===")

    # Create a Flower of Life counter
    fol = FlowerOfLife()

    # Count regions for different numbers of circles
    for n in range(1, 8):
        regions = fol.count_regions(n)
        print(f"Circles: {n}, Regions: {regions}")

    print()


def progression_example():
    """Show how to get the complete progression sequence."""
    print("=== Progression Example ===")

    fol = FlowerOfLife()

    # Get the progression up to 10 circles
    progression = fol.get_progression(10)
    print(f"Progression (1-10 circles): {progression}")

    # Get the intervals
    intervals = fol.get_intervals(10)
    print(f"Intervals: {intervals}")

    print()


def validation_example():
    """Validate against known sequence values."""
    print("=== Validation Example ===")

    fol = FlowerOfLife()

    # Check if our implementation matches the known sequence
    is_valid = fol.validate_known_sequence()
    print(f"Implementation matches known sequence: {is_valid}")

    # Show the known sequence
    print(f"Known sequence: {fol._known_sequence}")
    print(f"Known intervals: {fol._known_intervals}")

    print()


def pattern_analysis_example():
    """Demonstrate pattern analysis capabilities."""
    print("=== Pattern Analysis Example ===")

    fol = FlowerOfLife()

    # Get detailed pattern analysis
    analysis = fol.get_pattern_analysis(25)

    print("Pattern Analysis Results:")
    print(f"Progression: {analysis['progression']}")
    print(f"Intervals: {analysis['intervals']}")
    print(f"Average interval: {analysis['average_interval']:.2f}")
    print(f"Interval histogram: {analysis['interval_histogram']}")
    print(f"Pattern type: {analysis['pattern_type']}")
    print(f"Extrapolation method: {analysis['extrapolation_method']}")

    print()


def edge_cases_example():
    """Demonstrate handling of edge cases."""
    print("=== Edge Cases Example ===")

    fol = FlowerOfLife()

    # Test edge cases
    print(f"Zero circles: {fol.count_regions(0)}")
    print(f"One circle: {fol.count_regions(1)}")

    # Test larger numbers (extrapolation)
    print(f"15 circles: {fol.count_regions(15)}")
    print(f"20 circles: {fol.count_regions(20)}")

    print()


def error_handling_example():
    """Demonstrate error handling."""
    print("=== Error Handling Example ===")

    fol = FlowerOfLife()

    try:
        # This should raise a ValueError
        fol.count_regions(-1)
    except ValueError as e:
        print(f"Caught expected error: {e}")

    try:
        # This should raise a NotImplementedError
        FlowerOfLife(dimension=3)
    except NotImplementedError as e:
        print(f"Caught expected error: {e}")

    print()


def visualization_example():
    """Demonstrate visualization capabilities."""
    print("=== Visualization Example ===")

    fol = FlowerOfLife()

    # Render a single pattern (will be saved in flower_of_life_images by default)
    print("Rendering 5-circle pattern...")
    fol.render_pattern(n_circles=5,
                     output_dir="example_images",
                     overwrite=True)

    # Generate validation images
    print("Generating validation images...")
    fol.generate_validation_images(max_circles=17,
                                 output_dir="validation_images",
                                 overwrite=True)

    # Demonstrate different output options
    print("Demonstrating different output options...")

    # Save with custom filename in specific directory
    fol.render_pattern(n_circles=3,
                     output_path="custom_pattern.png",
                     output_dir="custom_images",
                     overwrite=True)

    # Save with default naming (will use flower_of_life_images directory)
    fol.render_pattern(n_circles=2, overwrite=True)

    print()


def main():
    """Run all examples."""
    print("Flower of Life Region Counter - Examples")
    print("=" * 50)
    print()

    basic_usage_example()
    progression_example()
    validation_example()
    pattern_analysis_example()
    edge_cases_example()
    error_handling_example()
    visualization_example()

    print("All examples completed!")


if __name__ == "__main__":
    main()
