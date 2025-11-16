"""
Configuração de instalação para o CutPlanner
"""

from setuptools import setup, find_packages
from pathlib import Path

# Ler o README
this_directory = Path(__file__).parent
long_description = (this_directory / "README.md").read_text(encoding="utf-8")

setup(
    name="cutplanner",
    version="1.0.0",
    author="CutPlanner Team",
    author_email="team@cutplanner.com",
    description="Sistema inteligente de otimização de cortes para serralherias",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/cutplanner/cutplanner",
    project_urls={
        "Bug Reports": "https://github.com/cutplanner/cutplanner/issues",
        "Source": "https://github.com/cutplanner/cutplanner",
        "Documentation": "https://cutplanner.readthedocs.io/",
    },
    packages=find_packages(),
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: Manufacturing",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: 3.11",
        "Topic :: Scientific/Engineering :: Mathematics",
        "Topic :: Software Development :: Libraries :: Python Modules",
        "Topic :: Manufacturing",
    ],
    python_requires=">=3.8",
    install_requires=[
        "fastapi>=0.104.0",
        "uvicorn>=0.24.0",
        "pydantic>=2.5.0",
        "numpy>=1.24.0",
        "pandas>=2.0.0",
        "matplotlib>=3.7.0",
        "seaborn>=0.12.0",
        "jinja2>=3.1.0",
        "python-multipart>=0.0.6",
    ],
    extras_require={
        "dev": [
            "pytest>=7.0.0",
            "pytest-cov>=4.0.0",
            "black>=23.0.0",
            "flake8>=6.0.0",
            "mypy>=1.0.0",
        ],
        "docs": [
            "sphinx>=6.0.0",
            "sphinx-rtd-theme>=1.2.0",
            "myst-parser>=1.0.0",
        ],
        "full": [
            "scipy>=1.10.0",
            "scikit-learn>=1.2.0",
            "plotly>=5.0.0",
            "dash>=2.0.0",
        ],
    },
    entry_points={
        "console_scripts": [
            "cutplanner=cutplanner.cli:main",
        ],
    },
    include_package_data=True,
    package_data={
        "cutplanner": ["py.typed"],
    },
    zip_safe=False,
    keywords=[
        "cutting", "optimization", "manufacturing", "serralheria",
        "material", "waste", "efficiency", "algorithm", "1d", "2d"
    ],
) 