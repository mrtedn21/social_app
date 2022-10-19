from PIL import Image, ImageFilter


class Blur:
    def process(self, image):
        return image.filter(ImageFilter.GaussianBlur(radius=25))
