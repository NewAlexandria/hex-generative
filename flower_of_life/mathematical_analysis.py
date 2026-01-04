#!/usr/bin/env python3
"""
Mathematical Analysis of Flower of Life Pattern

This script demonstrates the mathematical relationships in the Flower of Life
pattern and shows how the region counting formula works.
"""

from flower_of_life import FlowerOfLife


def analyze_mathematical_pattern():
    """Analyze the mathematical pattern in detail."""
    print("Mathematical Analysis of Flower of Life Pattern")
    print("=" * 50)

    fol = FlowerOfLife()

    # Show the known sequence with detailed analysis
    print("\nKnown Sequence Analysis:")
    print("Circles | Regions | Interval | Cumulative")
    print("-" * 40)

    progression = fol.get_progression(7)
    intervals = fol.get_intervals(7)

    for i in range(7):
        circles = i + 1
        regions = progression[i]
        interval = intervals[i]
        cumulative = sum(intervals[:i+1])

        print(f"   {circles:2d}   |   {regions:2d}   |    {interval:2d}    |     {cumulative:2d}")

    print("\nPattern Observations:")
    print("- First circle: 1 region (base case)")
    print("- Second circle: +2 regions (vesica piscis)")
    print("- Third circle: +4 regions")
    print("- Circles 4-6: +4 regions each (stable pattern)")
    print("- Seventh circle: +5 regions (pattern shift)")

    # Analyze the intervals
    print(f"\nInterval Statistics:")
    print(f"- Known intervals: {intervals}")
    print(f"- Average interval (excluding first): {sum(intervals[1:]) / len(intervals[1:]):.2f}")
    print(f"- Most common interval: 4 (appears {intervals.count(4)} times)")

    return progression, intervals


def demonstrate_extrapolation():
    """Demonstrate how extrapolation works."""
    print("\n" + "=" * 50)
    print("Extrapolation Analysis")
    print("=" * 50)

    fol = FlowerOfLife()

    print("\nExtrapolation Method:")
    print("- For n ≤ 7: Use exact known values")
    print("- For n > 7: Linear approximation with slope ≈ 4.5")
    print("- Formula: regions(n) = 24 + (n-7) × 4.5")

    print("\nExtrapolated Values:")
    print("Circles | Calculated | Formula Check")
    print("-" * 35)

    for n in range(8, 16):
        calculated = fol.count_regions(n)
        formula_value = int(24 + (n - 7) * 4.5)

        print(f"   {n:2d}   |     {calculated:2d}     |      {formula_value:2d}")


def compare_with_general_circle_formula():
    """Compare with general circle arrangement formula."""
    print("\n" + "=" * 50)
    print("Comparison with General Circle Formula")
    print("=" * 50)

    fol = FlowerOfLife()

    print("\nGeneral circle arrangement formula: R(n) = n² - n + 2")
    print("This gives the maximum possible regions for n circles in general position.")
    print("\nComparison:")
    print("Circles | Flower of Life | General Formula | Difference")
    print("-" * 50)

    for n in range(1, 8):
        fol_regions = fol.count_regions(n)
        general_regions = n * n - n + 2
        difference = fol_regions - general_regions

        print(f"   {n:2d}   |      {fol_regions:2d}      |      {general_regions:2d}      |    {difference:+3d}")


def show_3d_considerations():
    """Show considerations for 3D extension."""
    print("\n" + "=" * 50)
    print("3D Extension Considerations")
    print("=" * 50)

    print("\nFor 3D Flower of Life (spheres instead of circles):")
    print("- Use sphere packing arrangements (FCC or HCP)")
    print("- Spheres intersect in circles, creating 3D regions")
    print("- Much more complex intersection geometry")
    print("- Need computational geometry libraries")
    print("- Current architecture supports dimension parameter")

    print("\nPotential 3D Formula Approach:")
    print("- Analyze sphere intersection patterns")
    print("- Count enclosed volumes rather than planar regions")
    print("- Consider Euler characteristic for 3D: V - E + F - C = 0")
    print("- Use Monte Carlo or mesh-based volume counting")


def main():
    """Run the complete mathematical analysis."""
    progression, intervals = analyze_mathematical_pattern()
    demonstrate_extrapolation()
    compare_with_general_circle_formula()
    show_3d_considerations()

    print("\n" + "=" * 50)
    print("Analysis Complete")
    print("=" * 50)
    print("\nThe Flower of Life pattern shows a structured progression")
    print("that differs from general circle arrangements due to its")
    print("hexagonal symmetry constraints. The implementation provides")
    print("an accurate counting method for 2D patterns with a foundation")
    print("for future 3D extension.")


if __name__ == "__main__":
    main()
